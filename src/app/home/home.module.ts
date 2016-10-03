import { NgModule }      from '@angular/core';

import { HomeComponent } from './home.component';
import { routing } from './home.routes';
import { SharedModule } from '../shared';
import { StudylistModule } from '../studylist';

@NgModule({
  imports:      [ routing, StudylistModule, SharedModule ],
  providers:    [ ],
  declarations: [ HomeComponent ],
})
export class HomeModule { }