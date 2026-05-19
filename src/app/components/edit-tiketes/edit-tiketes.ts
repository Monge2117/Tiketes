import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TiketesServiceService } from '../../services/tikete';
import { StatusDTO } from '../../models/statusDTO';
import { EditTicketRequest } from '../../models/editTiketeDTO';

@Component({
  selector: 'app-edit-tiketes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './edit-tiketes.html',
  styleUrls: ['./edit-tiketes.css'],
})
export class EditTiketes implements OnInit {
  private dialogRef = inject(MatDialogRef<EditTiketes>);
  private servicio = inject(TiketesServiceService);
  private fb = inject(FormBuilder);
  // MAT_DIALOG_DATA injection
  private data: any = inject(MAT_DIALOG_DATA);

  editForm: FormGroup;
  itemsStatus: StatusDTO[] = [];
  isSubmitting = false;

  constructor() {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      status: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadStatuses();

  }

  loadStatuses(): void {
    this.servicio.getStatuses().subscribe({
      next: (resp) => {
        this.itemsStatus = resp;
      debugger;
    if (this.data) {
      const code = this.getCodeByName(this.data.status);
      this.editForm.patchValue({
        name: this.data.nombre,
        status: code, // Assuming status is already the code, adjust if it's an object
      });
    }

      },
      error: (err) => console.error('[EditTiketes] loadStatuses', err),
    });
  }

   getCodeByName(name: string): number | undefined {
  const status = this.itemsStatus.find(s => s.name === name);
  return status?.code;
}
  save() {
    if (this.editForm.invalid || this.isSubmitting) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const payload:EditTicketRequest = {
      name: this.editForm.value.name,
      status: Number(this.editForm.value.status),
    };

    const id = this.data?.id || this.data?.Id || this.data?.IdTicket || '';

    this.servicio.updateTicket(id, payload).subscribe({
      next: (resp) => {
        this.isSubmitting = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('[EditTiketes] update error', err);
        this.isSubmitting = false;
      },
    });
  }

  close() {
    this.dialogRef.close();
  }
}
