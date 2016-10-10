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
import {routing} from './config.routes';
import {DndModule} from 'ng2-dnd';
import {ConfigService} from './config.service';
import {TooltipModule} from 'primeng/primeng';
import {FileUploadModule} from 'ng2-file-upload';
import {StudymembersComponent} from './studyconfig/studymembers/studymembers.component'
import {StudymembersService} from './studyconfig/studymembers/studymembers.service'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports:      [ routing, TooltipModule, FileUploadModule, DndModule, HttpModule, DropdownModule, ReactiveFormsModule, SharedModule, InputTextModule, RadioButtonModule, CommonModule, FormsModule, ButtonModule, AutoCompleteModule, SliderModule, MessagesModule],
  providers:    [ MessageService, FieldlookupService, ConfigService, StudymembersService ],
  declarations: [ StudyconfigMenuComponent, DatafieldeditorComponent, StageconfigComponent, StudyConfigComponent, ReviewStrategyComponent, CriteriaConfigComponent, StudysourcesComponent, StudymembersComponent],
  exports:      [ StudyconfigMenuComponent, DatafieldeditorComponent, CriteriaConfigComponent],
})
export class ConfigModule { }