import { NgModule }      from '@angular/core';

import { HomeComponent } from './home.component';
import { routing } from './home.routes';
import { SharedModule } from '../shared';
import { StudylistModule } from '../studylist';
import { ConfigModule } from '../studyconfig-menu';
import {FieldDynModule} from '../field-dyn/field-dyn.module'

@NgModule({
  imports:      [ routing, StudylistModule, SharedModule, ConfigModule, FieldDynModule ],
  providers:    [ ],
  declarations: [ HomeComponent ],
})
export class HomeModule { }