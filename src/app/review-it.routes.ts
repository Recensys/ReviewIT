/**
 * Created by jbec on 11/07/2016.
 */

import {provideRouter, RouterConfig} from '@angular/router';

import { taskRoutes } from './task/task.routes';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
import { StudyconfigMenuComponent } from './studyconfig-menu/studyconfig-menu.component';
import { PageNotFoundComponent } from './page-not-found';

export const routes: RouterConfig = [
  ...taskRoutes,
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'studyconfig', component: StudyconfigMenuComponent },
  { path: '**', component: PageNotFoundComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
