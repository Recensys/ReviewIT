import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared';

// 3rd party
import { MaterialModule } from '@angular/material'
import { InputTextModule, RadioButtonModule, AutoCompleteModule, SliderModule, MessagesModule, ButtonModule, DropdownModule } from 'primeng/primeng';

import { CriteriaconfigService } from './criteriaconfig.service'
import { CriteriaConfigComponent } from './criteriaconfig.component'
// dyn criteria
import { DynCriteriaComponent } from './dyn-criteria.component'
import { BooleanCriteriaComponent } from './dyn-criteria/boolean-criteria.component'
import { NumberCriteriaComponent } from './dyn-criteria/number-criteria.component'

@NgModule({
  imports:          [ RouterModule, HttpModule, SharedModule, FormsModule, ReactiveFormsModule, MaterialModule, DropdownModule, InputTextModule, RadioButtonModule, CommonModule, ButtonModule, AutoCompleteModule, SliderModule, MessagesModule ],
  providers:        [ CriteriaconfigService ],
  declarations:     [ CriteriaConfigComponent, DynCriteriaComponent, BooleanCriteriaComponent, NumberCriteriaComponent ],
  entryComponents:  [ BooleanCriteriaComponent, NumberCriteriaComponent ],
  exports:          [ DynCriteriaComponent ],
})
export class CriteriaconfigModule { }