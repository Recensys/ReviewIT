import { Component, ViewContainerRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";
import { APP_ROUTER_PROVIDERS } from "./review-it.routes";
import { NavbarComponent } from './shared'

@Component({
  moduleId: module.id,
  selector: 'review-it-app',
  template: `
      <div class="container-fluid">
        <app-navbar></app-navbar>
        <router-outlet></router-outlet>
      </div>
  `,
  directives: [ ROUTER_DIRECTIVES, NavbarComponent ]
})

export class ReviewITAppComponent {


  //for bootstrap modal
  viewContainerRef: ViewContainerRef;
  constructor(viewContainerRef:ViewContainerRef) {
    this.viewContainerRef = viewContainerRef;
  }
}
