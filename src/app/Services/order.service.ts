import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../Interfaces/order';
import { environments } from '../Environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderForm } from '../Interfaces/order-form';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  findAllOrders(): Observable<Order[]> {
    const uri = environments.api.url + "/Order/all";
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
    const options = { headers: headers };
    let aux = this.httpClient.get<Order[]>(uri, options);
    return aux;
  }

  createOrder(orderAux: OrderForm): Observable<Order> {
    const uri = environments.api.url + "/Order/create";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
    const options = { headers: headers };
    return this.httpClient.post<Order>(uri, orderAux, options);
  }

  updateOrder(orderAux: Order): Observable<Order> {
    const uri = environments.api.url + "/Order/update";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    });
    const options = { headers: headers };
    return this.httpClient.put<Order>(uri, orderAux, options);
  }

}
