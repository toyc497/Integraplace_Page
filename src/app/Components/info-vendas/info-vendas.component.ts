import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../Interfaces/order';
import { OrderStoreService } from '../../Storages/order-store.service';
import { OrderService } from '../../Services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-info-vendas',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './info-vendas.component.html',
  styleUrl: './info-vendas.component.css'
})
export class InfoVendasComponent {

  orderAux!: Order;

  constructor(
    private orderStoreService: OrderStoreService,
    private orderService: OrderService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.orderStoreService.getInfoOrder().subscribe(order => {
      if (order) {
        this.orderAux = order;
        this.getItems(order.id);
      }
    });
  }

  updateOrder() {
    this.orderService.updateOrder(this.orderAux).subscribe({
      next: (response) => {
        this.showSnack('Pedido atualizado com sucesso!', true);

        this.orderStoreService.updateOrderState(response);
      },
      error: (err) => {
        console.error(err);
        this.showSnack('Erro ao atualizar pedido.', false);
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

  getItems(id: number){
    
  }

  cancel() {
    this.route.navigate(['/order']);
  }

}
