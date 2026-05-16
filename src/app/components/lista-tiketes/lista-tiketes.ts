import { Component, inject, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginatorModule, PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TiketesServiceService } from '../../services/tikete';
import { TicketDto } from '../../models/tiketeDTO';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-lista-tiketes',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './lista-tiketes.html',
  styleUrl: './lista-tiketes.css',
})
export class ListaTiketes implements OnInit {
  private tiketService = inject(TiketesServiceService);

  private paginator?: MatPaginator;
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    if (paginator) {
      this.paginator = paginator;
      this.dataSource.paginator = paginator;
    }
  }
  @ViewChild(MatTable) table?: MatTable<TicketDto>;
  private cdr = inject(ChangeDetectorRef);

  displayedColumns: string[] = ['number', 'nombre', 'status', 'assignedBox', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<TicketDto>();
  isLoading = false;
  totalItems = 0;

  // Filtros por columna
  filters = {
    number: '',
    nombre: '',
    status: '',
    assignedBox: '',
  };

  // Estado de paginación
  pageSize = 10;
  currentPage = 0;

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.isLoading = true;

    const filterParams: Record<string, string> = {};

    // Solo agregar filtros que tengan valor
    if (this.filters.number) {
      filterParams['number'] = this.filters.number;
    }
    if (this.filters.nombre) {
      filterParams['nombre'] = this.filters.nombre;
    }
    if (this.filters.status) {
      filterParams['status'] = this.filters.status;
    }
    if (this.filters.assignedBox) {
      filterParams['assignedBox'] = this.filters.assignedBox;
    }

    console.log('[ListaTiketes] loadData start', { page: this.currentPage, pageSize: this.pageSize, filters: filterParams });
    this.tiketService
      .getTickets2({
        // Backend expects 1-based page number
        page: this.currentPage + 1,
        pageSize: this.pageSize,
        filters: filterParams,
      })
      .pipe(
        finalize(() => {
          console.log('[ListaTiketes] request finalize - setting isLoading = false');
          this.isLoading = false;
          try {
            this.cdr.detectChanges();
          } catch (err) {
            console.warn('[ListaTiketes] detectChanges() in finalize warning', err);
          }
        })
      )
      .subscribe({
        next: (response: any) => {
          console.log('[ListaTiketes] response received', response);
          try {
            this.dataSource.data = response?.data ?? [];
            this.totalItems = response?.total ?? 0;
            if (this.paginator) {
              this.dataSource.paginator = this.paginator;
            }

            if (this.table) {
              try {
                this.table.renderRows();
              } catch (err) {
                console.warn('[ListaTiketes] table.renderRows() failed', err);
              }
            }

            try {
              this.cdr.detectChanges();
            } catch (err) {
              console.warn('[ListaTiketes] detectChanges() warning', err);
            }
          } catch (err) {
            console.error('[ListaTiketes] error processing response', err);
          }
        },
        error: (error) => {
          console.error('[ListaTiketes] error cargando datos:', error);
        },
      });
  }

  // Cuando cambia el filtro de una columna
  onFilterChange(): void {
    this.currentPage = 0; // Reiniciar a la primera página
    this.loadData();
  }

  // Cuando cambia la página
  onPageChange(event: PageEvent): void {
                if (this.table) {
                  try {
                    this.table.renderRows();
                  } catch (err) {
                    console.warn('[ListaTiketes] table.renderRows() failed', err);
                  }
                }
                try {
                  this.cdr.detectChanges();
                } catch (err) {
                  console.warn('[ListaTiketes] detectChanges() warning', err);
                }
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  // Limpiar filtros
  clearFilters(): void {
    this.filters = {
      number: '',
      nombre: '',
      status: '',
      assignedBox: '',
    };
    this.currentPage = 0;
    this.loadData();
  }
}
