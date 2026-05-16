import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CreateTikete } from '../../components/create-tikete/create-tikete';
import { CreateTiketes2 } from '../../components/create-tiketes2/create-tiketes2';
import { ListaTiketes } from "../../components/lista-tiketes/lista-tiketes";
@Component({
  selector: 'app-tiketes',
  imports: [MatButtonModule, ListaTiketes],
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




 openTicketModal2() {

   const dialogRef = this.dialog.open(CreateTiketes2,{
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
