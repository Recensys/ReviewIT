import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
  { path: 'home', loadChildren: 'app/login/home.module#HomeModule' },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

/*
RouterModule.forRoot([
			{ path: '', component: HomeComponent },
			{ path: 'login', component: LoginComponent },
			{ path: 'signup', component: SignupComponent },
			{ path: 'study/:id', children: [
				{ path: 'config', component: StudyconfigMenuComponent, canActivate: [LoggedInGuard] },
				...taskRoutes,
			]},
			{ path: '**', component: PageNotFoundComponent },
		], LoggedInGuard),
*/