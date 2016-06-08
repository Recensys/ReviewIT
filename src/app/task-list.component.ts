/**
 * Created by jbec on 08/06/2016.
 */

import { Component } from '@angular/core';
import {TaskService} from "./task.service";
import {Phase} from "./model/phase.model";
import {FieldComponent} from "./field.component";

@Component({
  selector: 'task-list',
  templateUrl: 'app/task-list.component.html',
  directives: [FieldComponent],
  providers: [TaskService]
})

export class TasklistComponent{

  public phases: Phase[];

  constructor(private _taskService: TaskService){
    this._taskService.getPhases().then(list => this.phases = list);
  }

}
