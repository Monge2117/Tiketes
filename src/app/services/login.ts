
import { LoginRequest } from '../models/loginDTO';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/enviroment';
@Injectable({
  providedIn: 'root',
})
export class Login {
  private http = inject(HttpClient);

  private api = environment.apiUrl;
  private apiUrl = `${this.api}/Token`;

  login(data: LoginRequest) {
    return this.http.post<any>(`${this.apiUrl}/login`, data, {
        withCredentials: true // 🔥 ESTO ES CLAVE PARA COOKIES
      });
  }
}
