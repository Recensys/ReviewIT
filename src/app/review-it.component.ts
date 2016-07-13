import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";
import { TasklistComponent } from "./task-list.component";
import {PhaseConfigComponent} from "./phase-config.component";
import {APP_ROUTER_PROVIDERS} from "./review-it.routes";

@Component({
  moduleId: module.id,
  selector: 'review-it-app',
  templateUrl: 'review-it.component.html',
  directives: [TasklistComponent, ROUTER_DIRECTIVES]
})

export class ReviewITAppComponent {
  title: "ReviewIT"
}
