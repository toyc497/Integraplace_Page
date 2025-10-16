import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../Interfaces/message.interface';
import { environments } from '../Environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }
  
  findMessageByEditalId(id: number): Observable<Message[]>{
  
    const uri = environments.api.url + "/Message/all/" + id;
    let headers = new HttpHeaders({'Authorization': `Bearer ${localStorage.getItem('access_token')}`});
    const options = {headers: headers};
    return this.httpClient.get<Message[]>(uri, options);
  
  }

}
