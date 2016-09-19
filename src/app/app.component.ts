import { Component, ViewContainerRef } from '@angular/core';

import {Message} from 'primeng/primeng';
import {MessageService} from './core';

@Component({
  moduleId: module.id,
  selector: 'review-it-app',
  template: `
      <div class="container-fluid">
        <app-navbar></app-navbar>
        <div style="padding-top: 90px;">
          <router-outlet></router-outlet>
        </div>
        <p-growl [life]='3000' [value]="msgs"></p-growl>
      </div>
  `,
})

export class ReviewITAppComponent {

  msgs: Message[] = [];
  
  viewContainerRef: ViewContainerRef;
  constructor(viewContainerRef:ViewContainerRef, messageService: MessageService) {
    this.viewContainerRef = viewContainerRef;

    messageService.msgs = this.msgs;
  }
}
