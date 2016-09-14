import { NgModule }      from '@angular/core';

import { LoginComponent } from './login.component';
import { routing } from './login.routes';
import { SharedModule } from '../shared';
import {APIService} from '../services';
import {TestComponent} from './test.component'

@NgModule({
  imports:      [ routing, SharedModule ],
  providers:    [ APIService ],
  declarations: [ LoginComponent, TestComponent ],
})
export class LoginModule { }