import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Warehouse } from '../Interfaces/warehouse.interface';

@Injectable({
  providedIn: 'root'
})
export class WarehouseStoreService {

  private warehouseStateSubject = new BehaviorSubject<Warehouse[]>([])
  private warehouseBehavior = this.warehouseStateSubject.asObservable();

  constructor() { }

  getWarehouseState(): Observable<Warehouse[]>{
    return this.warehouseBehavior;
  }

  setWarehouseState(warehouseList: Warehouse[]){
    this.warehouseStateSubject.next(warehouseList);
  }

  updateWarehouseState(updatedWarehouse: Warehouse) {
    const current = this.warehouseStateSubject.getValue();
    const updatedList = current.map(p =>
      p.id === updatedWarehouse.id ? updatedWarehouse : p
    );
    this.warehouseStateSubject.next(updatedList);
  }

  newWarehouse(wrhsAux: Warehouse){
    const current = this.warehouseStateSubject.getValue();
    current.push(wrhsAux);
    this.warehouseStateSubject.next(current);
  }
}
