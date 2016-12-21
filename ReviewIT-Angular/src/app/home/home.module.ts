import { NgModule }      from '@angular/core';
import { MaterialModule } from '@angular/material'

import { HomeComponent } from './home.component';
import { routing } from './home.routes';
import { SharedModule } from '../shared';
import { StudylistModule } from '../studylist';
import { TestModule } from '../testcomponent/test.module'

@NgModule({
  imports:      [ routing, StudylistModule, SharedModule, MaterialModule, TestModule ],
  providers:    [ ],
  declarations: [ HomeComponent ],
})
export class HomeModule { }