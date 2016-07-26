import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { ReviewITAppComponent, environment, APP_ROUTER_PROVIDERS } from './app/';
import {HTTP_PROVIDERS} from '@angular/http';
import {CookieService} from 'angular2-cookie/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {DND_PROVIDERS} from 'ng2-dnd/ng2-dnd';
import {Ng2BootstrapConfig, Ng2BootstrapTheme} from 'ng2-bootstrap/ng2-bootstrap';  


if (environment.production) {
  enableProdMode();
}

Ng2BootstrapConfig.theme = Ng2BootstrapTheme.BS4;

bootstrap(ReviewITAppComponent, [APP_ROUTER_PROVIDERS, disableDeprecatedForms(),
  provideForms(),HTTP_PROVIDERS, CookieService, DND_PROVIDERS]);

