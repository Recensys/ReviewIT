import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { TaskDetailsComponent, TasklistComponent }    from './';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: '', component: TaskDetailsComponent},
  { path: ':id', component: TasklistComponent},
]);
