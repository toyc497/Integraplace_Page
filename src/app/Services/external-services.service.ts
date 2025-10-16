import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CEP } from '../Interfaces/cep.interface';
import { environments } from '../Environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ExternalServicesService {

  constructor(private httpClient: HttpClient) { }

  cepConsult(cepAux: number): Observable<CEP>{

    const uri = environments.api.url + "/Externalapi/cep"
    const deleteUri = `${uri}/${cepAux}`
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('access_token')}`});
    const options = {headers: headers};
    return this.httpClient.get<CEP>(deleteUri, options);

  }

}
