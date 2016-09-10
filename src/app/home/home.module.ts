import { NgModule }      from '@angular/core';

import { HomeComponent } from './home.component';
import { routing } from './home.routes';
import { SharedModule } from '../shared';
import {StudylistModule} from '../studylist';
import {ConfigModule} from '../studyconfig-menu';

@NgModule({
  imports:      [ routing, StudylistModule, SharedModule, ConfigModule ],
  providers:    [ ],
  declarations: [ HomeComponent ],
})
export class HomeModule { }