import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Edital } from '../Interfaces/edital.interface';

@Injectable({
  providedIn: 'root'
})
export class EditalStoreService {

  private editalStateSubject = new BehaviorSubject<Edital[]>([]);
  private editalBehaviorStore = this.editalStateSubject.asObservable();

  constructor() { }

  getEditalState(): Observable<Edital[]>{
    return this.editalBehaviorStore;
  }

  setEditalState(editalList: Edital[]){
    this.editalStateSubject.next(editalList);
  }

}
