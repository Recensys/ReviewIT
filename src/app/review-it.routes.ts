/**
 * Created by jbec on 11/07/2016.
 */

import {provideRouter, RouterConfig} from '@angular/router';
import {StudyConfigComponent} from './study-config.component';
import {PhaseConfigComponent} from './phase-config.component';
import {StudyComponent} from './study.component';
import {TasklistComponent} from './task-list.component';
import {TaskDetailsComponent} from './task-details.component';
import {LoginComponenet} from './login.component';
import {SignupComponent} from './signup.component';

export const routes: RouterConfig = [
  { path: '', component: TasklistComponent },
  { path: 'tasks', component: TasklistComponent },
  { path: 'task/:id', component: TaskDetailsComponent },
  { path: 'phase/:id', component: PhaseConfigComponent },
  { path: 'study', component: StudyComponent },
  { path: 'study/:id', component: StudyConfigComponent },
  { path: 'login', component: LoginComponenet },
  { path: 'signup', component: SignupComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
