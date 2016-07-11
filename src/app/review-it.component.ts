import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "@angular/router";
import { TasklistComponent } from "./task-list.component";
import {PhaseConfigComponent} from "./phase-config.component";

@Component({
  moduleId: module.id,
  selector: 'review-it-app',
  templateUrl: 'review-it.component.html',
  directives: [ROUTER_DIRECTIVES, TasklistComponent],
  providers: [ROUTER_PROVIDERS]
})

@Routes([
  { path: 'list', component: TasklistComponent },
  { path: 'phase/:id', component: PhaseConfigComponent }
])


export class ReviewITAppComponent {
  title: "ReviewIT"
}
