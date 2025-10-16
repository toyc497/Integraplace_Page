import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import { KeycloakAuthService } from '../../Services/keycloak-auth.service';
import { catchError, of, tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [ CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  toogleHide: boolean = false;
  time: string = '';

  constructor(private keycloakAuthService: KeycloakAuthService){}

  ngOnInit() {
    this.updateTime();

    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    this.time = `${hours}:${minutes}:${seconds}`;
  }

  logout(){
    this.keycloakAuthService.logoutKeycloak().pipe(
      tap((response: HttpResponse<any>) => {
        console.log('Logout realizado com sucesso:', response.status);
      }),
      catchError((error) => {
        console.error('Erro ao realizar logout:', error.status);
        return of(error);
      })
    ).subscribe(() => {
      localStorage.clear();
      window.location.reload();
    });
  }

}
