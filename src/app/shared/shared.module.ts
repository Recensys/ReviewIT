import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { ApiHelper } from './apihelper.service';
import { DndModule } from 'ng2-dnd';
import { CardInitDirective } from './card-init.directive'

@NgModule({
  imports:      [ CommonModule, DndModule.forRoot() ],
  declarations: [ CardInitDirective ],
  exports:      [ CommonModule, FormsModule, DndModule, CardInitDirective ],
  providers:    [ ApiHelper ]
})
export class SharedModule { }