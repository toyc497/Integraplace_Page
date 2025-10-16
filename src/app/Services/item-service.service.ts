import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../Interfaces/item';
import { Observable } from 'rxjs';
import { environments } from '../Environments/environments';
import { ItemForm } from '../Interfaces/item-form';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private httpClient: HttpClient) { }

  findAllItem(): Observable<Item[]>{
    const uri = environments.api.url + "/Item/all"
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('access_token')}`});
    const options = {headers: headers};
    return this.httpClient.get<Item[]>(uri, options);
  }

  createItem(itemAux: ItemForm): Observable<Item>{
    const uri = environments.api.url + "/Item/create"
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('access_token')}`});
    const options = {headers: headers};
    return this.httpClient.post<Item>(uri, itemAux, options);
  }

  updateItem(itemAux: Item): Observable<Item>{
    const uri = environments.api.url + "/Item/update"
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('access_token')}`});
    const options = {headers: headers};
    return this.httpClient.put<Item>(uri, itemAux, options);
  }
}
