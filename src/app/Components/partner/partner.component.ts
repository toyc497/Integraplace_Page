import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PartnerStoreService } from '../../Storages/partner-store.service';
import { PartnerService } from '../../Services/partner.service';
import { Partner } from '../../Interfaces/partner.interface';
import { CommonModule } from '@angular/common';
import { AddPartnerComponent } from '../add-partner/add-partner.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    CommonModule,
    FormsModule
  ],
  templateUrl: './partner.component.html',
  styleUrl: './partner.component.css'
})
export class PartnerComponent {

  listPartners: Partner[] = [];
  searchTerm: string = "";

  constructor(public dialog: MatDialog, private partnerStoreService: PartnerStoreService, private partnerService: PartnerService, private route: Router){}

  ngOnInit(){

    if(this.listPartners.length == 0){
      this.partnerService.findAllPartners().subscribe(
        listAux => this.partnerStoreService.setPartnerState(listAux)
      );
    }
    
    this.partnerStoreService.getPartnerState().subscribe(
      listAux => this.listPartners = listAux
    );

  }

  verifyTypeOfPartner(type: string){
    if(type == "S"){
      return "Fornecedor";
    }
    return "Cliente";
  }

  setInfoPartner(partner: Partner){
    this.partnerStoreService.setInfoPartner(partner);
    this.route.navigate(['/info-partner']);
  }

  searchPartners(){
    if(this.searchTerm == ''){
      this.partnerStoreService.getPartnerState().subscribe(
        listAux => this.listPartners = listAux
      );
    }else{
      let listAux: Partner[] = [];

      for(let i=0; i < this.listPartners.length; i++){
        if(this.listPartners[i].code.toLowerCase() == this.searchTerm.toLowerCase() || this.listPartners[i].fullname.toLowerCase().includes(this.searchTerm.toLowerCase())){
          listAux.push(this.listPartners[i]);
        }
      }

      this.listPartners = listAux
    }
  }

  openAddPartnerDialog(){
    this.dialog.open(AddPartnerComponent,{
      width: '40%',
      height: '75%',
    });
  }

}
