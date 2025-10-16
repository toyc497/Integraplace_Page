import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Warehouse } from '../../Interfaces/warehouse.interface';
import { WarehouseService } from '../../Services/warehouse.service';
import { ItemStoreService } from '../../Storages/item-store.service';
import { ItemServiceService } from '../../Services/item-service.service';
import { Item } from '../../Interfaces/item';
import { ItemForm } from '../../Interfaces/item-form';
import { WarehouseStoreService } from '../../Storages/warehouse-store.service';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {

  listWrhs: Warehouse[] = [];
  nameAux: string = "";
  typeAux: string = "";
  quantAux: number = 0;
  minQuantAux: number = 0;
  lengthAux: number = 0;
  heightAux: number = 0;
  widthAux: number = 0;
  weightAux: number = 0;
  wrhsAux: string = "";

  constructor(public dialogRef: MatDialogRef<AddItemComponent>, private warehouseService: WarehouseService, private itemStoreService: ItemStoreService, private itemServiceService: ItemServiceService, private warehouseStoreService: WarehouseStoreService){}

  ngOnInit(){

    if(this.listWrhs.length == 0){
      this.warehouseService.findAllWarehouses().subscribe(
        listAux => this.listWrhs = listAux
      );
    }
    

    this.warehouseStoreService.getWarehouseState().subscribe(
      response => this.listWrhs = response
    );

  }

  closeDialog(){
    this.dialogRef.close();
  }

  saveItem(){
    let itemAux: ItemForm = {
      id: 0,
      code: '',
      name: this.nameAux,
      type: this.typeAux,
      quantity: this.quantAux,
      minimal_quantity: this.minQuantAux,
      item_length: this.lengthAux,
      item_height: this.heightAux,
      item_width: this.widthAux,
      item_weight: this.weightAux,
      wrhs_father: this.wrhsAux
    }

    this.itemServiceService.createItem(itemAux).subscribe(
      responseAux => this.itemStoreService.newItem(responseAux)
    );
  }

}
