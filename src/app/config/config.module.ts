import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule,RouterOutlet} from '@angular/router'

import { MessageService } from '../core';
import { InputTextModule, RadioButtonModule, AutoCompleteModule, SliderModule, MessagesModule, ButtonModule, DropdownModule } from 'primeng/primeng';
import {SharedModule} from '../shared';
import {routing} from './config.routes';
import {TooltipModule} from 'primeng/primeng';
import {FileUploadModule} from 'ng2-file-upload';
import { ReactiveFormsModule } from '@angular/forms';

import {ConfigComponent} from './config.component'
import { StudyConfigComponent } from './studydetails/studydetails.component'
import { StudydetailsService } from './studydetails/studydetails.service'
import { StudysourcesComponent } from './studysources/studysources.component'
import { StudysourcesService } from './studysources/studysources.service'
import {StudydetailsResolve} from './studydetails/studydetails-resolve.service'

@NgModule({
  imports:      [ routing, RouterModule, TooltipModule, FileUploadModule, HttpModule, DropdownModule, ReactiveFormsModule, SharedModule, InputTextModule, RadioButtonModule, CommonModule, FormsModule, ButtonModule, AutoCompleteModule, SliderModule, MessagesModule],
  providers:    [ MessageService, StudydetailsService, StudysourcesService, StudydetailsResolve ],
  declarations: [ ConfigComponent, StudyConfigComponent, StudysourcesComponent ],
  exports:      [ ],
})
export class ConfigModule { }