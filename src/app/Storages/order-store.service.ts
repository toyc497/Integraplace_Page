import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../Interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderStoreService {

  private orderStateSubject = new BehaviorSubject<Order[]>([]);
  private orderBehaviorStore = this.orderStateSubject.asObservable();

  private infoOrderStateSubject = new BehaviorSubject<Order | null>(null);
  private infoOrderBehaviorStore = this.infoOrderStateSubject.asObservable();

  constructor() {}

  getOrderState(): Observable<Order[]> {
    return this.orderBehaviorStore;
  }

  setOrderState(orderList: Order[]) {
    this.orderStateSubject.next(orderList);
  }

  newOrder(orderAux: Order) {
    let orderList = this.orderStateSubject.getValue();
    orderList.push(orderAux);
    this.orderStateSubject.next(orderList);
  }

  getInfoOrder(): Observable<Order | null> {
    return this.infoOrderBehaviorStore;
  }

  setInfoOrder(orderAux: Order) {
    this.infoOrderStateSubject.next(orderAux);
  }

  updateOrderState(updatedOrder: Order) {
    const current = this.orderStateSubject.getValue();
    const updatedList = current.map(o =>
      o.id === updatedOrder.id ? updatedOrder : o
    );
    this.orderStateSubject.next(updatedList);
  }

}
