import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Route }        from '@angular/router';

import { StageconfigComponent } from './stageconfig.component';
import { StagedetailsComponent } from './stagedetails/stagedetails.component';


export const stageRoutes: Route[] = [
  { path: 'stage/:id', component: StageconfigComponent },
  { path: 'stage/:id', component: StageconfigComponent, children: [
    { path: 'stagedetails', component: StagedetailsComponent }
  ]},
];

