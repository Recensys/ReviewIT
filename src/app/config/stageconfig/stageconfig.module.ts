import { NgModule }      from '@angular/core';
import { CommonModule }       from '@angular/common';
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '@angular/material'

import { StageconfigComponent } from './stageconfig.component'
import { StageconfigService } from './stageconfig.service'
import { StagedetailsComponent } from './stagedetails/stagedetails.component'
import { StagedetailsService } from './stagedetails/stagedetails.service'

@NgModule({
  imports:      [ CommonModule, RouterModule, FormsModule, MaterialModule.forRoot() ],
  providers:    [ StageconfigService, StagedetailsService ],
  declarations: [ StageconfigComponent, StagedetailsComponent ],
  exports:      [ ],
})
export class StageconfigModule { }