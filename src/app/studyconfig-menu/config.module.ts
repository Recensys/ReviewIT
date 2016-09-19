import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StudyConfigComponent } from './studyconfig';
import { DatafieldeditorComponent } from './datafieldeditor';
import { StudyconfigMenuComponent } from './studyconfig-menu.component';
import { MessageService } from '../core';
import { InputTextModule, RadioButtonModule, AutoCompleteModule, SliderModule, MessagesModule, ButtonModule, DropdownModule } from 'primeng/primeng';
import {SharedModule} from '../shared';
import {StageconfigComponent} from './stageconfig';
import {ReviewStrategyComponent} from './stageconfig/review-strategy';
import {StudysourcesComponent} from './studyconfig/studysources';
import {CriteriaConfigComponent, FieldlookupService} from './studyconfig/criteria-config';
import {routing} from './study.routes';

@NgModule({
  imports:      [  HttpModule, BrowserModule, DropdownModule, SharedModule, InputTextModule, RadioButtonModule, CommonModule, FormsModule, ButtonModule, AutoCompleteModule, SliderModule, MessagesModule],
  providers:    [ MessageService, FieldlookupService ],
  declarations: [ StudyconfigMenuComponent, DatafieldeditorComponent, StageconfigComponent, StudyConfigComponent, ReviewStrategyComponent, CriteriaConfigComponent],
  exports:      [ StudyconfigMenuComponent, DatafieldeditorComponent, CriteriaConfigComponent],
})
export class ConfigModule { }