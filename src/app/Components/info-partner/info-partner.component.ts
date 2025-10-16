import { Component } from '@angular/core';
import { PartnerStoreService } from '../../Storages/partner-store.service';
import { Partner } from '../../Interfaces/partner.interface';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PartnerService } from '../../Services/partner.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-info-partner',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './info-partner.component.html',
  styleUrl: './info-partner.component.css'
})
export class InfoPartnerComponent {

  partnerAux!: Partner;

  constructor(private partnerStoreService: PartnerStoreService, private partnerService: PartnerService, private route: Router, private snackBar: MatSnackBar){}

  ngOnInit(){
    this.partnerStoreService.getInfoPartner().subscribe(
      partner => {
        if(partner){
          this.partnerAux = partner
        }
      }
    );
  }

  cancel(){
    this.route.navigate(['/partner']);
  }

  updatePartner(){
    this.partnerService.updatePartner(this.partnerAux).subscribe({
      next: (response) => {
        this.showSnack('Parceiro atualizado com sucesso!', true);

        this.partnerStoreService.updatePartnerState(response);
      },
      error: (err) => {
        console.error(err);
        this.showSnack('Erro ao atualizar parceiro.', false);
      }
    });
  }

  showSnack(message: string, success: boolean) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: success ? ['success-snackbar'] : ['error-snackbar']
    });
  }

  verifyTypeOfPartner(type: string){
    if(type == "S"){
      return "Fornecedor";
    }
    return "Cliente";
  }

}
