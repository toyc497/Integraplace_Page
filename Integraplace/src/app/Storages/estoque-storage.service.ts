import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Estoque } from '../Interfaces/Estoque';

@Injectable({
  providedIn: 'root'
})
export class EstoqueStorageService {

  private estoqueState = new BehaviorSubject<any>({
    estoqueList: []
  });
  private estoqueSubject = this.estoqueState.asObservable();

  getEstoques(): Observable<Estoque[]>{
    return this.estoqueSubject;
  }

  setEstoques(listEstoque: Estoque[]){
    this.estoqueState.next(listEstoque);
  }

}
