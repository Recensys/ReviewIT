import { RouterConfig }         from '@angular/router';

import { TasklistComponent }    from './task-list/task-list.component';
import { TaskDetailsComponent }  from './task-details/task-details.component';

export const taskRoutes: RouterConfig = [
  { path: 'task/:id',  component: TasklistComponent },
  { path: 'tasks', component: TaskDetailsComponent }
];