import { Component, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";
import { APP_ROUTER_PROVIDERS } from "./review-it.routes";

import { NavbarComponent, MessageService } from './shared'
import { Message } from 'primeng/primeng';
import {Growl} from 'primeng/primeng';

@Component({
  moduleId: module.id,
  selector: 'review-it-app',
  template: `
      <div class="container-fluid">
        <app-navbar></app-navbar>
        <router-outlet></router-outlet>
        <p-growl [life]='3000' [value]="msgs"></p-growl>
      </div>
  `,
  directives: [ ROUTER_DIRECTIVES, NavbarComponent, Growl ]
})

export class ReviewITAppComponent {

  msgs: Message[] = [];
  
  viewContainerRef: ViewContainerRef;
  constructor(viewContainerRef:ViewContainerRef, messageService: MessageService) {
    this.viewContainerRef = viewContainerRef;

    messageService.msgs = this.msgs;
  }
}
