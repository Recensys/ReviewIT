import { NgModule }      from '@angular/core';
import { CommonModule }       from '@angular/common';
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '@angular/material'

import { StageconfigComponent } from './stageconfig.component'
import { StagedetailsComponent } from './stagedetails/stagedetails.component'
import { Sharedstagelist } from '../stagelist/sharedstagelist.service'
import { StagedetailsService } from './stagedetails/stagedetails.service'

@NgModule({
  imports:      [ CommonModule, RouterModule, FormsModule, MaterialModule ],
  providers:    [ Sharedstagelist, StagedetailsService ],
  declarations: [ StageconfigComponent, StagedetailsComponent ],
  exports:      [ ],
})
export class StageconfigModule { }