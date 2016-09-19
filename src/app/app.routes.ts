import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found';

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
	{
		path: 'home',
		loadChildren:
		'app/studyconfig-menu/config.module#ConfigModule'
	},
	{
		path: '**',
		component: PageNotFoundComponent
	},
];

export const routeProviders: any[] = [

]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

