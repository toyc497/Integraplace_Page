import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../Interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class ItemStoreService {

  private itemStateSubject = new BehaviorSubject<Item[]>([]);
  private itemBehaviorStore = this.itemStateSubject.asObservable();

  private infoItemStateSubject = new BehaviorSubject<Item | null>(null);
    private infoItemBehaviorStore = this.infoItemStateSubject.asObservable();

  constructor() { }

  getItemState(): Observable<Item[]>{
    return this.itemBehaviorStore;
  }

  setItemState(itemList: Item[]){
    this.itemStateSubject.next(itemList);
  }

  newItem(itemAux: Item){
    let itemList = this.itemStateSubject.getValue();
    itemList.push(itemAux);
    this.itemStateSubject.next(itemList);
  }

  getInfoItem(): Observable<Item | null>{
    return this.infoItemBehaviorStore;
  }

  setInfoItem(itemAux: Item){
    this.infoItemStateSubject.next(itemAux);
  }

  updateItemState(updatedItem: Item) {
    const current = this.itemStateSubject.getValue();
    const updatedList = current.map(p =>
      p.id === updatedItem.id ? updatedItem : p
    );
    this.itemStateSubject.next(updatedList);
  }

}
