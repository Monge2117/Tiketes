import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketDto } from '../models/tiketeDTO';
import { environment } from '../enviroments/enviroment';
import { CreateTicketRequest } from '../models/createTiketeRequest';
import { StatusDTO } from '../models/statusDTO';
@Injectable({
  providedIn: 'root',
})
export class TiketesServiceService {
  private apiUrl = environment.apiUrl + '/tickets';
  private http = inject(HttpClient);

  getStatuses(): Observable<StatusDTO[]> {
    return this.http.get<StatusDTO[]>(
      `${this.apiUrl}/statuses`,{
        withCredentials: true // 🔥 ESTO ES CLAVE PARA COOKIES
      }
    );
  }
  getTickets(): Observable<TicketDto[]> {
    return this.http.get<TicketDto[]>(this.apiUrl+'/ListaTiketes',{ withCredentials: true});
  }
 getTickets2(params: {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  filters?: Record<string, string>;
}) {
  return this.http.get<{ data: TicketDto[]; total: number }>(
    this.apiUrl+'/ListaTiketes2',
    {
      params: {
        page: params.page,
        pageSize: params.pageSize,
        search: params.search || '',
        sortBy: params.sortBy || '',
        sortDir: params.sortDir || '',
        ...params.filters // 🔥 aquí va lo importante
      },
      withCredentials: true
    }
  );
}

   // Crear ticket
  createTicket(ticket:CreateTicketRequest): Observable<TicketDto> {
     const params = new HttpParams()
      .set('nombreCliente', ticket.nombreCliente)
      .set('status', ticket.status)
      .set('AssignedBox', ticket.assignedBox);

    return this.http.post<TicketDto>(this.apiUrl+'/CreateTikete', null,{params, withCredentials: true});
  }

  // Actualizar ticket
  updateTicket(id: string, ticket: Partial<TicketDto>): Observable<TicketDto> {
    return this.http.put<TicketDto>(`${this.apiUrl}+'/ModificarTikete'/${id}`, ticket,{ withCredentials: true});
  }

  // Eliminar ticket
  deleteTicket(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ withCredentials: true});
  }
}
