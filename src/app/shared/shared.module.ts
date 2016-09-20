import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { ApiHelper } from './apihelper.service';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ ],
  exports:      [ CommonModule, FormsModule ],
  providers:    [ ApiHelper ]
})
export class SharedModule { }