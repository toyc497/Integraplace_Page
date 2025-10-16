import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Opportunity } from '../Interfaces/opportunity.interface';
import { environments } from '../Environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {

  constructor(private httpClient: HttpClient) { }

  findAllOpportunity(): Observable<Opportunity[]>{
  
    const uri = environments.api.url + "/Opportunity/all"
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('access_token')}`});
    const options = {headers: headers};
    return this.httpClient.get<Opportunity[]>(uri, options);
  
  }

}
