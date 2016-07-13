/**
 * Created by jbec on 11/07/2016.
 */

import {Component} from '@angular/core';
import {TaskService} from "./task.service";
import {Phase} from "./model/phase.model";
import {FieldComponent} from "./field.component";
import {PhaseConfigComponent} from "./phase-config.component";

@Component({
  selector: 'phase-config',
  templateUrl: 'app/phase-list.component.html',
  directives: [PhaseConfigComponent],
  providers: [TaskService]
})

export class PhaseListComponent {
  public phases: Phase[];

  constructor(private _taskService: TaskService){
    this._taskService.getPhases().then(list => this.phases = list);
  }
}
