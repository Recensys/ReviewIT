import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { TaskDetailsComponent, TasklistComponent,  }    from './';
import { TaskDashboard } from './task-dashboard.component'
import { StagelistComponent } from './stagelist/stagelist.component'

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'study/:id', component: StagelistComponent },
  // { path: 'stage/:id', component: TaskDashboard, children: [
  //   { path: 'list', component: TasklistComponent },
  // ] },
    { path: 'stage/:id/details', component: TaskDetailsComponent },
  
]);
