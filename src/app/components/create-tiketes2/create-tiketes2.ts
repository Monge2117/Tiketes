import { Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import moment from 'moment';
import { StatusDTO } from '../../models/statusDTO';
import { TiketesServiceService } from '../../services/tikete';
import { MatDialogRef } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list'
@Component({
  selector: 'app-create-tiketes2',
  imports: [
    CommonModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule
  ],
  templateUrl: './create-tiketes2.html',
  styleUrl: './create-tiketes2.css',
})



export class CreateTiketes2 implements OnInit {

private dialogRef = inject(
   MatDialogRef<CreateTiketes2>
 );

private cdRef = inject(ChangeDetectorRef);
private servicio = inject(TiketesServiceService);

 TiketeForm: FormGroup;
  itemsStatus: StatusDTO[] = [];
  isSubmitting = false;

  constructor(private fb: FormBuilder, private statusService: TiketesServiceService) {
    this.TiketeForm = this.fb.group({
      Number: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      CreatedAt: [moment(), [Validators.required]],
      AssignedBox: ['', [Validators.required, Validators.minLength(6)]],
      Status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarStatus();
  }

  guardarTikete() {
    if (this.TiketeForm.invalid || this.isSubmitting) {
      if (this.TiketeForm.invalid) {
        this.TiketeForm.markAllAsTouched();
      }
      return;
    }

    this.isSubmitting = true;
    const tiketeData = this.TiketeForm.value;
    const fecha = this.TiketeForm.value.fecha?.format?.('DD/MM/YYYY');
    console.log('Datos del Tikete:', tiketeData);

    this.servicio.createTicket2(tiketeData).subscribe({
      next: (resp) => {
        console.log('Tikete creado:', resp);
        this.TiketeForm.reset(); // Limpia los campos del formulario
        this.isSubmitting = false;
        //this.dialogRef.close(true); // Cierra el modal y pasa true para indicar éxito
      },
      error: (error) => {
        console.error('Error al crear el tikete:', error);
        this.isSubmitting = false; // Permite reintentar después de un error
      }
    });


  }

   cargarStatus(): void {

    this.statusService.getStatuses()
      .subscribe({

        next: (resp) => {

          Promise.resolve().then(() => {
            this.itemsStatus = resp;
            this.cdRef.detectChanges();
          });

          console.log('Status cargados:', this.itemsStatus);
        },

        error: (error) => {

          console.error(error);

        }

      });
    }

      closeModal(){
   this.dialogRef.close();
 }

}
