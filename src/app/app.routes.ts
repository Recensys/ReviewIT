import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
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
];

export const routeProviders: any[] = [

]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

