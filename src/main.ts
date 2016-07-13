import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { ReviewITAppComponent, environment, APP_ROUTER_PROVIDERS } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(ReviewITAppComponent, [APP_ROUTER_PROVIDERS]);

