import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { ReviewITAppComponent, environment, APP_ROUTER_PROVIDERS } from './app/';
import {HTTP_PROVIDERS} from '@angular/http';
import {CookieService} from 'angular2-cookie/core';



if (environment.production) {
  enableProdMode();
}

bootstrap(ReviewITAppComponent, [APP_ROUTER_PROVIDERS, HTTP_PROVIDERS, CookieService]);

