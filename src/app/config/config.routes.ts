import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { ConfigComponent }    from './config.component';
import {StudyConfigComponent} from './studydetails/studydetails.component'
import {StudysourcesComponent} from './studysources/studysources.component'
import {StudydetailsResolve} from './studydetails/studydetails-resolve.service'
import {stageRoutes} from './stageconfig/stageconfig.routes'

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: ':id', children: [
    { path: '', component: ConfigComponent},
    { path: 'studydetails', component: StudyConfigComponent, outlet: 'config', resolve: {studydetail: StudydetailsResolve}},
    { path: 'studysources', component: StudysourcesComponent, outlet: 'config'},
    ...stageRoutes
  ]  },
]);
