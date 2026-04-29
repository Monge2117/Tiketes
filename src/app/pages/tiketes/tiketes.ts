import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CreateTikete } from '../../components/create-tikete/create-tikete';

@Component({
  selector: 'app-tiketes',
  imports: [MatButtonModule],
  templateUrl: './tiketes.html',
  styleUrl: './tiketes.css',
})
export class Tiketes {
   private dialog = inject(MatDialog);

 openTicketModal() {

   const dialogRef = this.dialog.open(CreateTikete,{
      width:'800px',
      height:'400px',
      maxWidth:'95vw',
      disableClose:true, // evita cerrar clic afuera
      autoFocus:false
   });

dialogRef.afterClosed()
 .subscribe(result => {

   if(result){
      //this.loadTickets(); // recarga lista
   }

 });

 }
}
