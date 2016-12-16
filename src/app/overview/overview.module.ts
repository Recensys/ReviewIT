import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';

import { SharedModule } from '../shared'
import { MaterialModule } from '@angular/material'
import { OverviewService } from './overview.service'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  providers: [
    OverviewService
  ],
  declarations: [
    OverviewComponent
  ],
  exports: [
    OverviewComponent
  ]
})
export class OverviewModule { }
