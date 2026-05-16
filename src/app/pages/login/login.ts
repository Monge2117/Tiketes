import { Login as LoginService } from './../../services/login';
import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
// Service

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
 private fb = inject(FormBuilder);
  private authService = inject(LoginService);
private router = inject(Router);
  // 🧠 STATE con signals
  loading = signal(false);
  error = signal<string | null>(null);

  // 🔥 trigger del login
  triggerLogin = signal<{ email: string; password: string } | null>(null);



form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });



// 🚀 Login convertido a signal
loginResponse = toSignal(
  toObservable(this.triggerLogin).pipe(
    switchMap((data) => {
      if (!data) return of(null);

      this.loading.set(true);
      this.error.set(null);

      return this.authService.login(data).pipe(
        tap(() => {
          // 👉 Cookie se guarda automáticamente
          this.router.navigate(['/menus']);
        }),
        catchError((err) => {
          this.error.set('Credenciales incorrectas');
          return of(null);
        }),
        tap(() => this.loading.set(false))
      );
    })
  ),
  { initialValue: null }
);

  constructor() {
    // 👀 efecto cuando cambia la respuesta
    effect(() => {
      console.log('Signal ejecutándose...');
      const res = this.loginResponse();

      if (res) {
        console.log('Login exitoso');

        // 👉 aquí puedes redirigir
        // this.router.navigate(['/dashboard']);
      }
    });
  }

   // 🎯 Acción login
 login() {
  if (this.form.invalid) return;

  const { email, password } = this.form.getRawValue();

  this.triggerLogin.set({
    email: email!,
    password: password!
  });
}

}
