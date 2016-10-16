import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { ApiHelper } from './apihelper.service';
import { DndModule } from 'ng2-dnd';


@NgModule({
  imports:      [ CommonModule, DndModule.forRoot() ],
  declarations: [ ],
  exports:      [ CommonModule, FormsModule, DndModule ],
  providers:    [ ApiHelper ]
})
export class SharedModule { }