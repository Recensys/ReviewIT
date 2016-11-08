import { NgModule }      from '@angular/core';

import { PageNotFoundComponent } from './page-not-found.component';
import { routing } from './page-not-found.routes';
import { SharedModule } from '../shared';

@NgModule({
  imports:      [ routing, SharedModule ],
  providers:    [ ],
  declarations: [ PageNotFoundComponent ],
  exports:      [ PageNotFoundComponent ]
})
export class PageNotFoundModule { }