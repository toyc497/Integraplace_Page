import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-info-chat',
  standalone: true,
  imports: [
    MatRadioModule,
    FormsModule
  ],
  templateUrl: './info-chat.component.html',
  styleUrl: './info-chat.component.css'
})
export class InfoChatComponent {

  textCommentAux: string = "My Comment";
  commentAux: string = "";

  constructor(public dialogRef: MatDialogRef<InfoChatComponent>){}

  closeDialog(){
    this.dialogRef.close();
  }

  save(){

  }

}
