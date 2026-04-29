import { Tikete } from './../tikete/tikete';
import {
 Component,
 inject,
 signal
} from '@angular/core';

import {
 FormBuilder,
 ReactiveFormsModule,
 Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { toSignal } from '@angular/core/rxjs-interop';

import { tap } from 'rxjs';

import { TiketesServiceService } from '../../services/tikete';
import { CreateTicketRequest } from '../../models/createTiketeRequest';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
@Component({
  selector: 'app-create-tikete',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule, MatIcon],
  templateUrl: './create-tikete.html',
  styleUrl: './create-tikete.css',
})
export class CreateTikete {

   private fb = inject(FormBuilder);
   private ticketService = inject(TiketesServiceService);

    private dialogRef = inject(
   MatDialogRef<CreateTikete>
 );

 loading = signal(false);
 successMessage = signal('');
 errorMessage = signal('');

  form = this.fb.nonNullable.group({
   nombreCliente:['', Validators.required],
   assignedBox:['', Validators.required],
   status:[0, Validators.required]
 });

 // statuses vienen del API y se convierten en signal
 statuses = toSignal(
   this.ticketService.getStatuses()
   .pipe(
      tap(x => console.log('estatus:', x))
   ),
   {
     initialValue:[]
   }
 );

 submit(){

   if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
   }

   const {
      nombreCliente,
      assignedBox,
      status
   } = this.form.getRawValue();

   this.loading.set(true);
const nuevoTicket: CreateTicketRequest = {
  nombreCliente: nombreCliente,
  status: status,
  assignedBox: assignedBox
};
   this.ticketService
      .createTicket(nuevoTicket
      )
      .pipe(
        tap({
          next:()=>{

            this.successMessage.set(
              'Ticket creado correctamente'
            );

            this.errorMessage.set('');

            this.form.reset({
               nombreCliente:'',
               assignedBox:'',
               status:0
            });

            this.loading.set(false);
               // si éxito cerrar modal:
             this.dialogRef.close(true);
          },

          error:()=>{

            this.errorMessage.set(
              'Error creando ticket'
            );

            this.loading.set(false);
          }
        })
      )
      .subscribe();
 }

  closeModal(){
   this.dialogRef.close();
 }

}
