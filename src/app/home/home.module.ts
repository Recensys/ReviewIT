import { NgModule }      from '@angular/core';
import { MaterialModule } from '@angular/material'

import { HomeComponent } from './home.component';
import { routing } from './home.routes';
import { SharedModule } from '../shared';
import { StudylistModule } from '../studylist';

@NgModule({
  imports:      [ routing, StudylistModule, SharedModule, MaterialModule ],
  providers:    [ ],
  declarations: [ HomeComponent ],
})
export class HomeModule { }