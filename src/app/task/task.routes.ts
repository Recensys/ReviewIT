import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { TaskDetailsComponent, TasklistComponent }    from './';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'task', component: TaskDetailsComponent},
  { path: 'task/:id/details', component: TasklistComponent},
]);
