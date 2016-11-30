import { NgModule }      from '@angular/core';
import { MaterialModule, MdIconModule } from '@angular/material'

import { SharedModule } from '../shared';
import { StudylistComponent } from './studylist.component';
import { RouterModule } from '@angular/router';
import { StudylistService } from './studylist.service';

@NgModule({
  imports:      [ SharedModule, RouterModule, MaterialModule ],
  providers:    [ StudylistService ],
  declarations: [ StudylistComponent ],
  exports:      [ StudylistComponent ]
})
export class StudylistModule { }