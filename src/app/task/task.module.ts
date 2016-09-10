import { NgModule }      from '@angular/core';

import { routing } from './task.routes';
import { SharedModule } from '../shared';

@NgModule({
  imports:      [ routing, SharedModule ],
  providers:    [ ],
  declarations: [ ],
})
export class TaskModule { }