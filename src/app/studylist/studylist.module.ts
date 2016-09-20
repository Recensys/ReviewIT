import { NgModule }      from '@angular/core';

import { SharedModule } from '../shared';
import { StudylistComponent } from './studylist.component';
import { RouterModule } from '@angular/router';
import { ConfigModule } from '../studyconfig-menu';
import { StudylistService } from './studylist.service'

@NgModule({
  imports:      [ SharedModule, RouterModule, ConfigModule ],
  providers:    [ StudylistService ],
  declarations: [ StudylistComponent ],
  exports:      [ StudylistComponent ]
})
export class StudylistModule { }