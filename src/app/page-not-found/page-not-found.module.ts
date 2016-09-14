import { NgModule }      from '@angular/core';

import { PageNotFoundComponent } from './page-not-found.component';
import { routing } from './page-not-found.routes';
import { SharedModule } from '../shared';
import {APIService} from '../services';

@NgModule({
  imports:      [ routing, SharedModule ],
  providers:    [ APIService ],
  declarations: [ PageNotFoundComponent ],
  exports:      [ PageNotFoundComponent ]
})
export class PageNotFoundModule { }