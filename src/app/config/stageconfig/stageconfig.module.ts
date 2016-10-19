import { NgModule }      from '@angular/core';
import { CommonModule }       from '@angular/common';
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '@angular/material'
import { DndModule } from 'ng2-dnd';

import { StageconfigComponent } from './stageconfig.component'
import { StagedetailsComponent } from './stagedetails/stagedetails.component'
import { Sharedstagelist } from '../stagelist/sharedstagelist.service'
import { StagedetailsService } from './stagedetails/stagedetails.service'
import { StagefieldseditorComponent } from './stagefieldseditor/stagefieldseditor.component'
import { StagefieldseditorService } from './stagefieldseditor/stagefieldseditor.service'

@NgModule({
  imports:      [ CommonModule, RouterModule, FormsModule, MaterialModule, DndModule ],
  providers:    [ Sharedstagelist, StagedetailsService, StagefieldseditorService ],
  declarations: [ StageconfigComponent, StagedetailsComponent, StagefieldseditorComponent ],
  exports:      [ ],
})
export class StageconfigModule { }