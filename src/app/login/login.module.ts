import { NgModule }      from '@angular/core';

import { LoginComponent } from './login.component';
import { routing } from './login.routes';
import { SharedModule } from '../shared';

@NgModule({
  imports:      [ routing, SharedModule ],
  providers:    [ ],
  declarations: [ LoginComponent ],
})
export class LoginModule { }