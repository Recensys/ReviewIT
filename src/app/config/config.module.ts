import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, RouterOutlet } from '@angular/router'

import { MaterialModule } from '@angular/material'
import { InputTextModule, RadioButtonModule, AutoCompleteModule, SliderModule, MessagesModule, ButtonModule, DropdownModule } from 'primeng/primeng';
import { SharedModule } from '../shared';
import { routing } from './config.routes';
import { TooltipModule } from 'primeng/primeng';
import { FileUploadModule } from 'ng2-file-upload';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

/* study config */
import { ConfigComponent } from './config.component'
import { ConfigService } from './config.service'
import { StudyConfigComponent } from './studydetails/studydetails.component'
import { StudydetailsService } from './studydetails/studydetails.service'
import { StudysourcesComponent } from './studysources/studysources.component'
import { StudysourcesService } from './studysources/studysources.service'
import { StudydetailsResolve} from './studydetails/studydetails-resolve.service'
import { CriteriaconfigModule } from './criteriaconfig/criteriaconfig.module'
import { StudymembersComponent } from './studymembers/studymembers.component'
import { StudymembersService } from './studymembers/studymembers.service'
import { DatafieldeditorComponent } from './datafieldeditor/datafieldeditor.component'
import { DatafieldeditorService } from './datafieldeditor/datafieldeditor.service'


/* stage config */
import { StageconfigModule } from './stageconfig/stageconfig.module'
import { Sharedstagelist } from './stagelist/sharedstagelist.service'
import { StagelistService } from './stagelist/stagelist.service'
import { StagelistComponent } from './stagelist/stagelist.component'

@NgModule({
  imports:      [ routing, StageconfigModule, RouterModule, ModalModule, MaterialModule, TooltipModule, FileUploadModule, HttpModule, DropdownModule, ReactiveFormsModule, SharedModule, InputTextModule, RadioButtonModule, CommonModule, FormsModule, ButtonModule, AutoCompleteModule, SliderModule, MessagesModule, CriteriaconfigModule],
  providers:    [ StudydetailsService, StudysourcesService, StudydetailsResolve, Sharedstagelist, StagelistService, StudymembersService, DatafieldeditorService, ConfigService ],
  declarations: [ ConfigComponent, StudyConfigComponent, StudysourcesComponent, StagelistComponent, StudymembersComponent, DatafieldeditorComponent ],
  exports:      [ ],
})
export class ConfigModule { }