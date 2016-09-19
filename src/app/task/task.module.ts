import { NgModule }      from '@angular/core';

import { routing } from './task.routes';
import { SharedModule } from '../shared';

import { TaskDetailsComponent, TasklistComponent } from './';
import { APIService } from '../services';

@NgModule({
  imports:      [ routing, SharedModule ],
  providers:    [ APIService ],
  declarations: [ TaskDetailsComponent, TasklistComponent ],
})
export class TaskModule { }