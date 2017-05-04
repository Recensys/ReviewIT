import { NgModule }      from '@angular/core';
import { RouterModule }      from '@angular/router';

import { routing } from './task.routes';
import { SharedModule } from '../shared';
import { MaterialModule } from '@angular/material';

import { TaskDetailsComponent, TasklistComponent } from './';
import { FieldDynModule } from '../field-dyn/field-dyn.module';
import { TaskDashboardService } from './task-dashboard.service'
import { TaskDashboard } from './task-dashboard.component'
import { StagelistComponent } from './stagelist/stagelist.component'
import { StagelistService } from './stagelist/stagelist.service'
import { TaskListService } from './task-list/task-list.service'
import { TaskDetailsService } from './task-details/task-details.service'
import { OverviewModule } from '../overview/overview.module';
import { TaskContentComponent } from './task-details/task-content/task-content.component'
import { TaskContentService } from './task-details/task-content/task-content.service'
import { SelectedTaskService } from './task-details/selected-task.service'

@NgModule({
  imports:      [ routing, RouterModule, SharedModule, FieldDynModule, MaterialModule, OverviewModule ],
  providers:    [ TaskDashboardService, StagelistService, TaskListService, TaskDetailsService, TaskContentService, SelectedTaskService ],
  declarations: [ TaskDetailsComponent, TasklistComponent, TaskDashboard, StagelistComponent, TaskContentComponent ],
})
export class TaskModule { }