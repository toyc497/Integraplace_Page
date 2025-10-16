import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../Environments/environments';

@Injectable({
  providedIn: 'root'
})
export class KeycloakAuthService {

  constructor(private httpClient: HttpClient) { }

  logoutKeycloak(): Observable<any>{

    const headersRequest = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const options = {
      headers: headersRequest,
      observe: 'response' as 'response'
    };

    const formDataLogout = new URLSearchParams();
    formDataLogout.set('client_id', `${environments.keycloak.config.clientId}`);
    formDataLogout.set('refresh_token', `${localStorage.getItem('refreshToken')}`)

    const logoutUri = `${environments.keycloak.config.url}/realms/${environments.keycloak.config.realm}/protocol/openid-connect/logout`;
    
    return this.httpClient.post<any>(logoutUri, formDataLogout, options);

  }
  
}
