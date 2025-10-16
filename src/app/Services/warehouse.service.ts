import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Warehouse } from '../Interfaces/warehouse.interface';
import { environments } from '../Environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private httpClient: HttpClient) { }

  findAllWarehouses(): Observable<Warehouse[]>{

    const uri = environments.api.url + "/Warehouse/all"
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('access_token')}`});
    const options = {headers: headers};
    return this.httpClient.get<Warehouse[]>(uri, options);

  }

  createWarehouse(warehouseAux: Warehouse): Observable<Warehouse>{

    const uri = environments.api.url + "/Warehouse/create"
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('access_token')}`});
    const options = {headers: headers};
    return this.httpClient.post<Warehouse>(uri, warehouseAux, options);

  }

  updateWarehouse(warehouseAux: Warehouse): Observable<Warehouse>{
      const uri = environments.api.url + "/Warehouse/update"
      let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('access_token')}`});
      const options = {headers: headers};
      return this.httpClient.put<Warehouse>(uri, warehouseAux, options);
    }

  deleteWarehouse(id: number): Observable<any>{

    const uri = environments.api.url + "/Warehouse/delete"
    const deleteUri = uri + `/${id}`
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('access_token')}`});
    const options = {headers: headers};
    return this.httpClient.delete<any>(deleteUri, options);

  }

}
