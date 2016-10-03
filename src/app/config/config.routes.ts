import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { StudyconfigMenuComponent }    from './studyconfig-menu.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  {
    path: ':id', component: StudyconfigMenuComponent
  }
]);
