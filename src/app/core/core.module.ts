import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf }       from '@angular/core';
import { CommonModule }      from '@angular/common';

import { UserService, MessageService }       from './services';
import { CookieService } from 'angular2-cookie/core';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [ UserService, MessageService, CookieService ]
})
export class CoreModule {
}