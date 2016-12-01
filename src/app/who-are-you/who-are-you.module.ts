import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material'

import { WhoAreYouComponent } from './who-are-you.component';
import { WhoAreYouService } from './who-are-you.service'
import { SharedModule } from '../shared';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    MaterialModule
  ],
  declarations: [WhoAreYouComponent],
  providers: [ WhoAreYouService ]
})
export class WhoAreYouModule { }
