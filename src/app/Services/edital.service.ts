import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditalForm } from '../Interfaces/editalform.interface';
import { Observable } from 'rxjs';
import { environments } from '../Environments/environments';
import { Edital } from '../Interfaces/edital.interface';

@Injectable({
  providedIn: 'root'
})
export class EditalService {

  constructor(private httpClient: HttpClient) { }

  findAllEditais(): Observable<Edital[]>{
  
      const uri = environments.api.url + "/Edital/all"
      let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('access_token')}`});
      const options = {headers: headers};
      return this.httpClient.get<Edital[]>(uri, options);
  
    }

  createWarehouse(editalAux: EditalForm): Observable<Edital>{
  
      const uri = environments.api.url + "/Edital/save"
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('access_token')}`});
      const options = {headers: headers};
      return this.httpClient.post<Edital>(uri, editalAux, options);
  
    }

}
