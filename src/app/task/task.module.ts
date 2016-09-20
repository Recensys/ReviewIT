import { NgModule }      from '@angular/core';

import { routing } from './task.routes';
import { SharedModule } from '../shared';

import { TaskDetailsComponent, TasklistComponent } from './';
import { APIService } from '../services';
import {FieldDynModule} from '../field-dyn/field-dyn.module';

@NgModule({
  imports:      [ routing, SharedModule, FieldDynModule ],
  providers:    [ APIService ],
  declarations: [ TaskDetailsComponent, TasklistComponent ],
})
export class TaskModule { }