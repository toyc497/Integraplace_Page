import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { AddWarehouseDialogComponent } from '../add-warehouse-dialog/add-warehouse-dialog.component';
import { WarehouseService } from '../../Services/warehouse.service';
import { Warehouse } from '../../Interfaces/warehouse.interface';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WarehouseStoreService } from '../../Storages/warehouse-store.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatIcon,
    CommonModule,
    HttpClientModule,
    AddWarehouseDialogComponent,
    FormsModule
  ],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css'
})
export class WarehouseComponent {

  warehouseList: Warehouse[] = [];

  constructor(public dialog: MatDialog, private warehouseService: WarehouseService, private warehouseStoreService: WarehouseStoreService, private snackBar: MatSnackBar){}

  ngOnInit(){

    if(this.warehouseList.length == 0){
      this.warehouseService.findAllWarehouses().subscribe(
        response => this.warehouseStoreService.setWarehouseState(response)
      );
    }

    this.warehouseStoreService.getWarehouseState().subscribe(
      response => this.warehouseList = response
    );
    
  }

  onActiveChange(event: Event, warehouse: Warehouse) {
    const checked = (event.target as HTMLInputElement).checked;
    warehouse.active = checked ? 'Y' : 'N';
    this.updateWarehouse(warehouse);
  }

  updateWarehouse(wrhsAux: Warehouse){
    this.warehouseService.updateWarehouse(wrhsAux).subscribe({
      next: (response) => {
        this.showSnack('Estoque atualizado com sucesso!', true);

        this.warehouseStoreService.updateWarehouseState(response);
      },
      error: (err) => {
        console.error(err);
        this.showSnack('Erro ao atualizar Estoque.', false);
      }
    });
  }

  showSnack(message: string, success: boolean) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: success ? ['success-snackbar'] : ['error-snackbar']
    });
  }

  openAddWarehouseDialog(){
    this.dialog.open(AddWarehouseDialogComponent,{
      width: '40%',
      height: '75%',
    });
  }

}
