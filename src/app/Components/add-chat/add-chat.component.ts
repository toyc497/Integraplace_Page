import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditalService } from '../../Services/edital.service';
import { EditalForm } from '../../Interfaces/editalform.interface';

@Component({
  selector: 'app-add-chat',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './add-chat.component.html',
  styleUrl: './add-chat.component.css'
})
export class AddChatComponent {

  systemList: string[] = ["Comprasgov"];
  systemAux: string = "";

  idAux: string = "";
  orgaoNameAux: string = "";
  editalAux: string = "";
  loteAux: string = "";

  constructor(private editalService: EditalService, public dialogRef: MatDialogRef<AddChatComponent>){}


  closeDialog(){
    this.dialogRef.close();
  }

  saveNewChat(){

    let editalAux: EditalForm = {
      identifier: this.idAux,
      agency: this.orgaoNameAux,
      notice: this.editalAux,
      batch: this.loteAux,
      comment: '',
      status: '',
      portal_link: '',
      portal_name: 'Comprasgov'
    }

    this.editalService.createWarehouse(editalAux).subscribe(
      response => alert("Criado: "+response.id)
    );

  }

}
