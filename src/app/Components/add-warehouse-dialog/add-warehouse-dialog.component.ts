import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Warehouse } from '../../Interfaces/warehouse.interface';
import { WarehouseService } from '../../Services/warehouse.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackBarAlertComponent } from '../snack-bar-alert/snack-bar-alert.component';
import { SnackBarAlertService } from '../../Storages/snack-bar-alert.service';
import { HttpResponse } from '@angular/common/http';
import { ExternalServicesService } from '../../Services/external-services.service';
import { WarehouseStoreService } from '../../Storages/warehouse-store.service';

@Component({
  selector: 'app-add-warehouse-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './add-warehouse-dialog.component.html',
  styleUrl: './add-warehouse-dialog.component.css'
})
export class AddWarehouseDialogComponent {

  nameAux: string = "";
  cepAux: number = 0;
  ufAux: string = "";
  addressAux: string = "";
  streetAux: number = 0;
  cityAux: string = "";
  blockAux: string = "";

  private _snackBar = inject(MatSnackBar);

  constructor(private warehouseService: WarehouseService, private warehouseStoreService: WarehouseStoreService, private snackBar: MatSnackBar, private externalServicesService: ExternalServicesService, public dialogRef: MatDialogRef<AddWarehouseDialogComponent>){}

  closeDialog(){
    this.dialogRef.close();
  }

  saveWarehouse(){
    let warehouseAux: Warehouse = {
      id: 0,
      code: '',
      name: this.nameAux,
      cep: this.cepAux,
      address: this.addressAux,
      streetnum: this.streetAux,
      city: this.cityAux,
      block: this.blockAux,
      uf: this.ufAux,
      active: 'Y'
    }

    this.warehouseService.createWarehouse(warehouseAux).subscribe({
      next: (response) => {
        this.showSnack('Estoque cadastrado com sucesso!', true);

        this.warehouseStoreService.newWarehouse(response);
      },
      error: (err) => {
        console.error(err);
        this.showSnack('Erro ao cadastrar Estoque.', false);
      }
    });
  }

  showSnack(message: string, success: boolean) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: success ? ['success-snackbar'] : ['error-snackbar']
    });
  }

  consultCep(){
    console.log("Entrou"+this.cepAux)
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
