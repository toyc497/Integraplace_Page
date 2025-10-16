import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../Environments/environments';
import { Partner } from '../Interfaces/partner.interface';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(private httpClient: HttpClient) { }
  
  findAllPartners(): Observable<Partner[]>{
    const uri = environments.api.url + "/BussinessPartner1/all"
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('access_token')}`});
    const options = {headers: headers};
    return this.httpClient.get<Partner[]>(uri, options);
  }

  createPartner(partnerAux: Partner): Observable<Partner>{
    const uri = environments.api.url + "/BussinessPartner1/create"
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('access_token')}`});
    const options = {headers: headers};
    return this.httpClient.post<Partner>(uri, partnerAux, options);
  }

  updatePartner(partnerAux: Partner): Observable<Partner>{
    const uri = environments.api.url + "/BussinessPartner1/update"
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('access_token')}`});
    const options = {headers: headers};
    return this.httpClient.put<Partner>(uri, partnerAux, options);
  }
  
}
