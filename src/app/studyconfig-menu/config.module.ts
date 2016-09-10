import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';

import { StudyConfigComponent } from './studyconfig';
import { DatafieldeditorComponent } from './datafieldeditor';
import { StudyconfigMenuComponent } from './studyconfig-menu.component';
import { MessageService } from '../core';
import { InputTextModule, RadioButtonModule, AutoCompleteModule, SliderModule, MessagesModule } from 'primeng/primeng';
import {SharedModule} from '../shared';
import {StageconfigComponent} from './stageconfig';
import {ReviewStrategyComponent} from './stageconfig/review-strategy';
import {StudysourcesComponent} from './studyconfig/studysources';


@NgModule({
  imports:      [ BrowserModule, SharedModule, InputTextModule, RadioButtonModule, CommonModule, FormsModule, AutoCompleteModule, SliderModule, MessagesModule],
  providers:    [ MessageService ],
  declarations: [ StudyconfigMenuComponent, DatafieldeditorComponent, StageconfigComponent, StudyConfigComponent, ReviewStrategyComponent],
  exports:      [ StudyconfigMenuComponent, DatafieldeditorComponent ],
})
export class ConfigModule { }