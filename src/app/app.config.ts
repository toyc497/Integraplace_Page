import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { environments } from './Environments/environments';


function initializeKeycloak(keycloak: KeycloakService){
  return () => keycloak.init({
    config: {
      url: environments.keycloak.config.url,
      realm: environments.keycloak.config.realm,
      clientId: environments.keycloak.config.clientId
    },
    initOptions: {
      onLoad: 'login-required',
      flow: 'standard'
    },
    enableBearerInterceptor: true
  })
  .then((authenticated) => {
    if(authenticated){
      const tokenInfo = keycloak.getKeycloakInstance();
      localStorage.setItem('refreshToken', `${tokenInfo.refreshToken}`);
      localStorage.setItem('access_token', `${tokenInfo.token}`);
      localStorage.setItem('clientId', `${tokenInfo.clientId}`);
      localStorage.setItem('has_admin_role', `${tokenInfo.hasRealmRole('ADMIN')}`);
    }
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    KeycloakService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    },
    provideAnimationsAsync(),
    provideHttpClient()
  ]
};