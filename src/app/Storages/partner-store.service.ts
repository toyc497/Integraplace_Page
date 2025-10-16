import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Partner } from '../Interfaces/partner.interface';

@Injectable({
  providedIn: 'root'
})
export class PartnerStoreService {

  private partnerStateSubject = new BehaviorSubject<Partner[]>([]);
  private partnerBehaviorStore = this.partnerStateSubject.asObservable();

  private infoPartnerStateSubject = new BehaviorSubject<Partner | null>(null);
  private infoPartnerBehaviorStore = this.infoPartnerStateSubject.asObservable();

  constructor() { }

  getPartnerState(): Observable<Partner[]>{
    return this.partnerBehaviorStore;
  }

  setPartnerState(partnerList: Partner[]){
    this.partnerStateSubject.next(partnerList);
  }

  newPartner(partnerAux: Partner){
    let partnerList = this.partnerStateSubject.getValue();
    partnerList.push(partnerAux);
    this.partnerStateSubject.next(partnerList);
  }

  getInfoPartner(): Observable<Partner | null>{
    return this.infoPartnerBehaviorStore;
  }

  setInfoPartner(partnerAux: Partner){
    this.infoPartnerStateSubject.next(partnerAux);
  }

  updatePartnerState(updatedPartner: Partner) {
    const current = this.partnerStateSubject.getValue();
    const updatedList = current.map(p =>
      p.id === updatedPartner.id ? updatedPartner : p
    );
    this.partnerStateSubject.next(updatedList);
  }

}
