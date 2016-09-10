import { NgModule }      from '@angular/core';

import { NavbarComponent } from './navbar.component';
import { UsernavComponent } from './usernav/usernav.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

@NgModule({
  imports:      [ RouterModule, SharedModule ],
  providers:    [ ],
  declarations: [ NavbarComponent, UsernavComponent ],
  exports:      [ NavbarComponent ]
})
export class NavbarModule { }