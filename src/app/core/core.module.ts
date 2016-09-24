import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf }       from '@angular/core';
import { CommonModule }      from '@angular/common';

import { UserService, MessageService }       from './services';
import { CookieService } from 'angular2-cookie/core';
import { NotificationsComponent } from './notifications/notifications.component'

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ NotificationsComponent ],
  exports:      [ NotificationsComponent ],
  providers:    [ UserService, MessageService, CookieService ]
})
export class CoreModule {
}