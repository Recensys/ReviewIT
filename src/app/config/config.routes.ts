import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { ConfigComponent }    from './config.component';
import {StudyConfigComponent} from './studydetails/studydetails.component'
import {StudysourcesComponent} from './studysources/studysources.component'
import {StudydetailsResolve} from './studydetails/studydetails-resolve.service'
import {CriteriaConfigComponent} from './criteriaconfig/criteriaconfig.component'
import {StagelistComponent} from './stagelist/stagelist.component'

// stageconfig 
import {stageRoutes} from './stageconfig/stageconfig.routes'

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: ':id', component: ConfigComponent },
  { path: ':id', component: ConfigComponent, children: [
      { path: 'studydetails', component: StudyConfigComponent },
      { path: 'studysources', component: StudysourcesComponent },
      { path: 'criteriaconfig', component: CriteriaConfigComponent },
      { path: 'stagelist', component: StagelistComponent },
      { path: 'stagelist', component: StagelistComponent, children: [
          ...stageRoutes
      ] },
  ] 
 },
]);
