import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found';

export const routes: Routes = [
	{
		path: 'login',
		loadChildren:
		'app/login/login.module#LoginModule'
	},
	{
		path: 'signup',
		loadChildren:
		'app/signup/signup.module#SignupModule'
	},
	{
		path: '**',
		component: PageNotFoundComponent
	},
];

export const routeProviders: any[] = [

]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

