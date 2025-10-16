import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Order } from '../../Interfaces/order';
import { AddOrderComponent } from '../add-order/add-order.component';
import { OrderStoreService } from '../../Storages/order-store.service';
import { OrderService } from '../../Services/order.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    CommonModule,
    FormsModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  listOrders: Order[] = [];
  searchTerm: string = "";

  constructor(
    public dialog: MatDialog,
    private orderStoreService: OrderStoreService,
    private orderService: OrderService,
    private route: Router
  ) {}

  ngOnInit() {
    if (this.listOrders.length == 0) {
      this.orderService.findAllOrders().subscribe(
        listAux => this.orderStoreService.setOrderState(listAux)
      );
    }

    this.orderStoreService.getOrderState().subscribe(
      listAux => this.listOrders = listAux
    );
  }

  verifyTypeOfOrder(type: string) {
    if (type == "S") {
      return "Fornecedor";
    }
    return "Cliente";
  }

  setInfoOrder(order: Order) {
    this.orderStoreService.setInfoOrder(order);
    this.route.navigate(['/info-order']);
  }

  searchOrders() {
    if (this.searchTerm == '') {
      this.orderStoreService.getOrderState().subscribe(
        listAux => this.listOrders = listAux
      );
    } else {
      let listAux: Order[] = [];

      for (let i = 0; i < this.listOrders.length; i++) {
        if (
          this.listOrders[i].code.toLowerCase() == this.searchTerm.toLowerCase() || this.listOrders[i].status.toLowerCase() == this.searchTerm.toLowerCase()
        ) {
          listAux.push(this.listOrders[i]);
        }
      }

      this.listOrders = listAux;
    }
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

  openAddOrderDialog() {
    this.dialog.open(AddOrderComponent, {
      width: '80%',
      height: '90%',
    });
  }
}
