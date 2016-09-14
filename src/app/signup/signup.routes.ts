import { ModuleWithProviders } from '@angular/core';
import { RouterModule }        from '@angular/router';

import { SignupComponent }    from './signup.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: '', component: SignupComponent}
]);
