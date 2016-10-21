import { NgModule }      from '@angular/core';
import { MaterialModule } from '@angular/material'

import { TestComponent } from './test.component'
import { TestService } from './test.service'

import { SharedModule } from '../shared'

@NgModule({
  imports:      [ MaterialModule, SharedModule ],
  providers:    [ TestService ],
  declarations: [ TestComponent ],
  exports:      [ TestComponent ]
})
export class TestModule { }