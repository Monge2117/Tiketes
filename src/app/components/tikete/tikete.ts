import { Component, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TiketesServiceService } from '../../services/tikete';
import { debounceTime, switchMap, tap, of } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tikete',
  imports: [DatePipe],
  templateUrl: './tikete.html',
  styleUrl: './tikete.css',
})
export class Tikete {
// 🔹 STATE
  pageIndex = signal(0);
  pageSize = signal(10);
  search = signal('');
  sortBy = signal('');
  sortDir = signal<'asc' | 'desc'>('asc');
filters = signal<Record<string, string>>({
  number: '',
  nombre: '',
  status: '',
  assignedBox: ''
});


  loading = signal(false);

  constructor(private ticketService: TiketesServiceService) {

  }

   query = computed(() => ({
    page: this.pageIndex() + 1,
    pageSize: this.pageSize(),
    search: this.search(),
    sortBy: this.sortBy(),
    sortDir: this.sortDir(),
    filters: this.filters()
  }));


    // 🔥 RESPONSE REACTIVO (AQUÍ VA EL DEBOUNCE)
  response = toSignal(
    toObservable(this.query).pipe(
      debounceTime(400),
      tap(() => this.loading.set(true)),
    switchMap(q => q.search ? this.ticketService.getTickets2(q) : of({ data: [], total: 0 })),
      tap(() => this.loading.set(false))
    ),
    { initialValue: { data: [], total: 0 } }
  );

    // 🔹 HELPERS
  data = computed(() => this.response().data);
  total = computed(() => this.response().total);

 // 🔹 ACTIONS
  onSort(column: string) {
    if (this.sortBy() === column) {
      this.sortDir.set(this.sortDir() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortBy.set(column);
      this.sortDir.set('asc');
    }
  }
    onPageChange(page: number) {
    this.pageIndex.set(page);
  }

  onFilterChange(column: string, event: Event) {
  const value = (event.target as HTMLInputElement).value;
  this.filters.update(f => ({
    ...f,
    [column]: value
  }));

  this.pageIndex.set(0); // reset página
  }
}
