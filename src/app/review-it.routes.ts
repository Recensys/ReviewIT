/**
 * Created by jbec on 11/07/2016.
 */

import { provideRouter, RouterConfig } from '@angular/router';
import {PhaseConfigComponent} from "./phase-config.component";
import {TasklistComponent} from "./task-list.component";
import {PhaseListComponent} from "./phase-list.component";
import {LoginComponenet} from "./login.component";
import {SignupComponent} from "./signup.component";

export const routes: RouterConfig = [
  { path: '', component: TasklistComponent },
  { path: 'list', component: TasklistComponent },
  { path: 'phase/:id', component: PhaseConfigComponent },
  { path: 'phases', component: PhaseListComponent },
  { path: 'login', component: LoginComponenet },
  { path: 'signup', component: SignupComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
