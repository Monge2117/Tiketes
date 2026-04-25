
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/enviroment';
import { MenuItem } from '../models/Menu-interface';
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private http = inject(HttpClient);

  private api = environment.apiUrl;
  private apiUrl = `${this.api}/Menus`;

  ObtenerMenus() {
    return this.http.get<MenuItem[]>(`${this.apiUrl}`, {
        withCredentials: true // 🔥 ESTO ES CLAVE PARA COOKIES
      });
  }
}
