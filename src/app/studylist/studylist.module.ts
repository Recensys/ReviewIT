import { NgModule }      from '@angular/core';

import { SharedModule } from '../shared';
import { StudylistComponent } from './studylist.component';
import { RouterModule } from '@angular/router';
import { ConfigModule } from '../studyconfig-menu';

@NgModule({
  imports:      [ SharedModule, RouterModule, ConfigModule ],
  providers:    [ ],
  declarations: [ StudylistComponent ],
  exports:      [ StudylistComponent ]
})
export class StudylistModule { }