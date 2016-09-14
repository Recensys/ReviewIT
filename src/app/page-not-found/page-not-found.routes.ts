import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { PageNotFoundComponent }    from './page-not-found.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: '', component: PageNotFoundComponent}
]);
