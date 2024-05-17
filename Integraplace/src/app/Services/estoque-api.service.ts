import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environments/Environment';
import { Observable } from 'rxjs';
import { Estoque } from '../Interfaces/Estoque';

@Injectable({
  providedIn: 'root'
})
export class EstoqueApiService {

  private url = environment.API_URL+"/Warehouse"

  constructor(private httpClient: HttpClient) { }

  getAllEstoques(): Observable<Estoque[]>{

    const urlAll = `${this.url}/all`;
    //let headersRequest = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('access_token')}`});
    //const options = {headers: headersRequest};
    return this.httpClient.get<Estoque[]>(urlAll);

  }

}
