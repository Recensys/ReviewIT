import { NgModule }      from '@angular/core';

import { SignupComponent } from './signup.component';
import { routing } from './signup.routes';
import { SharedModule } from '../shared';
import { APIService } from '../services';

@NgModule({
  imports:      [ routing, SharedModule ],
  providers:    [ APIService ],
  declarations: [ SignupComponent ],
})
export class SignupModule { }