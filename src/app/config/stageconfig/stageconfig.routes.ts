import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Route }        from '@angular/router';

import { StageconfigComponent } from './stageconfig.component'


export const stageRoutes: Route[] = [
  { path: 'stages', component: StageconfigComponent, outlet: 'config', children: [
  ] }
];
