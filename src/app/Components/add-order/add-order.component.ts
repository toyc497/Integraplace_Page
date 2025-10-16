import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderForm } from '../../Interfaces/order-form';
import { ItemOrderForm } from '../../Interfaces/item-order-form';
import { OrderService } from '../../Services/order.service';
import { OrderStoreService } from '../../Storages/order-store.service';
import { Partner } from '../../Interfaces/partner.interface';
import { PartnerService } from '../../Services/partner.service';
import { PartnerStoreService } from '../../Storages/partner-store.service';
import { CommonModule } from '@angular/common';
import { Item } from '../../Interfaces/item';
import { ItemServiceService } from '../../Services/item-service.service';
import { ItemStoreService } from '../../Storages/item-store.service';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css'
})
export class AddOrderComponent {
  listPartners: Partner[] = [];
  listItems: Item[] = [];

  listItemsAux: ItemOrderForm[] = [];

  bpr1Aux: string = "";
  itemCodeAux: string = "";
  quantAux: number = 0;
  unitPriceAux: number = 0;
  discountAux: number = 0;

  constructor(
    public dialogRef: MatDialogRef<AddOrderComponent>,
    private orderService: OrderService,
    private orderStoreService: OrderStoreService,
    private partnerService: PartnerService,
    private partnerStoreService: PartnerStoreService,
    private itemServiceService: ItemServiceService,
    private itemStoreService: ItemStoreService
  ) {}

  ngOnInit() {
    if (this.listPartners.length === 0) {
      this.partnerService.findAllPartners().subscribe(listAux => {
        this.checkPartners(listAux);
        this.partnerStoreService.setPartnerState(listAux);
      });
    }

    if (this.listItems.length === 0) {
      this.itemServiceService.findAllItem().subscribe(listAux => {
        this.checkItems(listAux);
        this.itemStoreService.setItemState(listAux);
      });
    }
  }

  checkPartners(listAux: Partner[]){
    if(listAux.length > 0){
      let listAuxPartner: Partner[] = [];

      for(let i=0; i<listAux.length; i++){
        if(listAux[i].active == "Y" && listAux[i].type == "C"){
          listAuxPartner.push(listAux[i]);
        }
      }

      this.listPartners = listAuxPartner
    }
  }

  checkItems(listAux: Item[]){
    if(listAux.length > 0){
      let listAuxItems: Item[] = [];

      for(let i=0; i<listAux.length; i++){
        if(listAux[i].wrhs_father.active == "Y"){
          listAuxItems.push(listAux[i]);
        }
      }
      this.listItems = listAuxItems
    }
  }

  saveItems(){
    let itemAux: ItemOrderForm = {
      item_code: this.itemCodeAux,
      quantity: this.quantAux,
      unit_price: this.unitPriceAux,
      discount: this.discountAux
    }

    this.listItemsAux.push(itemAux);
  }

  saveOrder() {
    if (!this.bpr1Aux) return;

    const orderAux: OrderForm = {
      bpr1Client: this.bpr1Aux,
      items_collection: this.listItemsAux
    };

    this.orderService.createOrder(orderAux).subscribe({
      next: (response) => {
        this.orderStoreService.newOrder(response);
        this.dialogRef.close();
      },
      error: (err) => console.error('Erro ao criar pedido:', err)
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
