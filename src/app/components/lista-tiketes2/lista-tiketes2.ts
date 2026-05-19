import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditTiketes } from '../edit-tiketes/edit-tiketes';
import { TiketesServiceService } from '../../services/tikete';
import { Ticket2Dto } from '../../models/tikete2DTO';

@Component({
  selector: 'app-lista-tiketes2',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    // Dialog component is standalone, no module needed here
  ],
  templateUrl: './lista-tiketes2.html',
  styleUrls: ['./lista-tiketes2.css'],
})
export class ListaTiketes2 {
  private tiketService = inject(TiketesServiceService);

  // Signals
  items = signal<Ticket2Dto[]>([]);
  totalItems = signal<number>(0);
  isLoading = signal<boolean>(false);

  // Filters as a signal (object updates use update())
  filters = signal({ number: '', nombre: '', status: '', assignedBox: '' });

  // Pagination
  page = signal(0); // 0-based
  pageSize = signal(10);

  // Table columns
  displayedColumns = ['number', 'nombre', 'status', 'assignedBox', 'createdAt', 'actions'];

  private dialog = inject(MatDialog);

  constructor() {
    // React to pagination/filters changes inside an injection context
    effect(() => {
      const _p = this.page();
      const _ps = this.pageSize();
      const _f = this.filters();
      this.loadData();
    });
  }



  private buildFilterParams(): Record<string, string> {
    const f = this.filters();
    const params: Record<string, string> = {};
    if (f.number) params['number'] = f.number;
    if (f.nombre) params['nombre'] = f.nombre;
    if (f.status) params['status'] = f.status;
    if (f.assignedBox) params['assignedBox'] = f.assignedBox;
    return params;
  }

  loadData(): void {
    this.isLoading.set(true);
    const params = {
      page: this.page() + 1, // backend expects 1-based
      pageSize: this.pageSize(),
      filters: this.buildFilterParams(),
    };

    this.tiketService
      .getTickets2(params)
      .subscribe({
        next: (response: any) => {
          const items: Ticket2Dto[] = Array.isArray(response) ? response : response?.data ?? [];
          this.items.set(items);
          this.totalItems.set(typeof response?.total === 'number' ? response.total : items.length);
          this.isLoading.set(false);
          console.log('[ListaTiketes2] loaded', { items: items.length, total: this.totalItems() });
        },
        error: (err) => {
          console.error('[ListaTiketes2] load error', err);
          this.items.set([]);
          this.totalItems.set(0);
          this.isLoading.set(false);
        },
      });
  }

  setFilter(key: 'number' | 'nombre' | 'status' | 'assignedBox', value: string) {
    // update filters signal
    this.filters.update((f: any) => ({ ...f, [key]: value }));
    // reset page
    this.page.set(0);
  }

  onPageChange(event: PageEvent) {
    this.page.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  clearFilters() {
    this.filters.set({ number: '', nombre: '', status: '', assignedBox: '' });
    this.page.set(0);
  }

  openDetails(item: Ticket2Dto) {
    const dialogRef = this.dialog.open(EditTiketes, { data: item, width: '500px',height: '300px' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });
  }
}
