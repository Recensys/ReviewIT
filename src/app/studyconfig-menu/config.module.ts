import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';

import { StudyconfigMenuComponent, DatafieldeditorComponent } from './';
import { MessageService } from '../shared';
import { InputTextModule, RadioButtonModule } from 'primeng/primeng';
import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';

@NgModule({
  imports:      [ BrowserModule, InputTextModule, RadioButtonModule, CommonModule, FormsModule ],
  providers:    [ MessageService, DND_DIRECTIVES ],
  declarations: [ StudyconfigMenuComponent, DatafieldeditorComponent ],
  exports:      [ StudyconfigMenuComponent, DatafieldeditorComponent ],
})
export class ConfigModule { }