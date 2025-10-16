import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ExternalServicesService } from '../../Services/external-services.service';
import { PartnerService } from '../../Services/partner.service';
import { Partner } from '../../Interfaces/partner.interface';
import { PartnerStoreService } from '../../Storages/partner-store.service';

@Component({
  selector: 'app-add-partner',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './add-partner.component.html',
  styleUrl: './add-partner.component.css'
})
export class AddPartnerComponent {

  nameAux: string = "";
  cpfcnpjAux: number = 0;
  typeAux: string = "";
  emailAux: string = "";
  phone1Aux: number = 0;
  phone2Aux: number = 0;
  cepAux: number = 0;
  ufAux: string = "";
  addressAux: string = "";
  streetAux: number = 0;
  cityAux: string = "";
  blockAux: string = "";

  constructor(public dialogRef: MatDialogRef<AddPartnerComponent>, private externalServicesService: ExternalServicesService, private partnerService: PartnerService, private partnerStoreService: PartnerStoreService){}

  closeDialog(){
    this.dialogRef.close();
  }

  savePartner(){
    let partnerAux: Partner = {
      id: 0,
      code: '',
      fullname: this.nameAux,
      cpf_cnpj: this.cpfcnpjAux,
      age: 0,
      type: this.typeAux,
      email: this.emailAux,
      phone1: this.phone1Aux,
      phone2: this.phone2Aux,
      cep: this.cepAux,
      address: this.addressAux,
      streetnum: this.streetAux,
      city: this.cityAux,
      block: this.blockAux,
      uf: this.ufAux,
      active: 'Y'
    }

    this.partnerService.createPartner(partnerAux).subscribe(
      responseAux => this.partnerStoreService.newPartner(responseAux)
    );

  }

  consultCep(){
    this.externalServicesService.cepConsult(this.cepAux).subscribe(
      response => {
        this.addressAux = response.logradouro;
        this.ufAux = response.uf;
        this.cityAux = response.localidade;
        this.blockAux = response.bairro;
      }
    );
  }

}
