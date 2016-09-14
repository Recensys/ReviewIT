import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { NavbarComponent }    from './navbar.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: '', component: NavbarComponent}
]);
