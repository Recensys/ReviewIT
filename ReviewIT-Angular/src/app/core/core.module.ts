import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf }       from '@angular/core';
import { CommonModule }      from '@angular/common';

import { UserService, MessageService }       from './services';
import { CookieService } from 'angular2-cookie/core';
import { SharedModule } from '../shared'
import { UserHttpService } from './services/userHttp.service'


@NgModule({
  imports:      [ CommonModule, SharedModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [ UserService, MessageService, CookieService, UserHttpService ]
})
export class CoreModule {
}