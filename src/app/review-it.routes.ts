
import {provideRouter, RouterConfig} from '@angular/router';

import { taskRoutes } from './task/task.routes';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
import { StudyconfigMenuComponent } from './studyconfig-menu/studyconfig-menu.component';
import { PageNotFoundComponent } from './page-not-found';
import { HomeComponent } from './home';
import { LoggedInGuard } from './loggedIn.guard'

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'study/:id', children: [
    { path: 'config', component: StudyconfigMenuComponent, canActivate: [LoggedInGuard] },
    ...taskRoutes,
  ]},
  { path: '**', component: PageNotFoundComponent },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  LoggedInGuard
];
