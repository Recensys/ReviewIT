import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { ApiHelper } from './apihelper.service';
import { DndModule } from 'ng2-dnd';
import { CardInitModule } from './card-init/card-init.module'

@NgModule({
  imports:      [ CommonModule, DndModule.forRoot(), CardInitModule ],
  declarations: [ ],
  exports:      [ CommonModule, FormsModule, DndModule, CardInitModule, ],
  providers:    [ ApiHelper ]
})
export class SharedModule { }