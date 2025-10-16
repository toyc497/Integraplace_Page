import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddChatComponent } from '../add-chat/add-chat.component';
import { InfoChatComponent } from '../info-chat/info-chat.component';
import { AnalyzeCompetitorComponent } from '../analyze-competitor/analyze-competitor.component';
import { EditalService } from '../../Services/edital.service';
import { Edital } from '../../Interfaces/edital.interface';
import { CommonModule } from '@angular/common';
import { Message } from '../../Interfaces/message.interface';
import { MessageService } from '../../Services/message.service';
import { MessageStoreService } from '../../Storages/message-store.service';
import { EditalStoreService } from '../../Storages/edital-store.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  editalList: Edital[] = [];
  actualEdital: Edital | undefined;
  linkAux: string = "";

  messagesList: Message[] = [];

  constructor(private editalService: EditalService, private messageService: MessageService, private editalStoreService: EditalStoreService, private messageStoreService: MessageStoreService, public dialog: MatDialog){}

  ngOnInit(){

    this.editalService.findAllEditais().subscribe(
      response => this.editalList = response
    );

  }

  openAddWarehouseDialog(){
    this.dialog.open(AddChatComponent,{
      width: '40%',
      height: '75%',
    });
  }

  openInfoDialog(){
    this.dialog.open(InfoChatComponent,{
      width: '40%',
      height: '75%',
    });
  }

  openAnalyzeCompetitorDialog(){
    this.dialog.open(AnalyzeCompetitorComponent,{
      width: '40%',
      height: '75%',
    });
  }

  gotoPortal() {

    if(this.linkAux != null && this.linkAux != ""){
      window.open(this.linkAux, "_blank");
    }else{
      alert("Não possui link")
    }
    
  }

  findMessages(edital: Edital){
    this.actualEdital = edital;
    this.linkAux = edital.portal_link;

    this.messageService.findMessageByEditalId(edital.id).subscribe(
      response => this.messagesList = response
    );
  }

  formatDataPortal(dataAux: String){
    if(dataAux == undefined || dataAux == ""){
      return "";
    }

    let dh_size = `${dataAux}`.slice(0,19);
    let dh_list = dh_size.split("T");
    let data_list = dh_list[0].split("-")
    let data_hora_formated = `${data_list[2]}/${data_list[1]}/${data_list[0]} ${dh_list[1]}`
    return data_hora_formated;
  }

}
