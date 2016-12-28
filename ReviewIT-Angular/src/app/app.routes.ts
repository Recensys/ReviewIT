import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found';
import { HomeComponent } from './home/home.component'

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	// {
	// 	path: 'login',
	// 	loadChildren:
	// 	'app/login/login.module#LoginModule'
	// },
	// {
	// 	path: 'signup',
	// 	loadChildren:
	// 	'app/signup/signup.module#SignupModule'
	// },
	{
		path: 'home',
		children: [
			{
				path: '',
				component: HomeComponent,
			},
			{
				path: 'config',
				loadChildren:
				'app/config/config.module#ConfigModule'
			},
			{
				path: 'task',
				loadChildren:
				'app/task/task.module#TaskModule'

			},
		]
	},
	{
		path: '**',
		component: PageNotFoundComponent
	},
];

export const routeProviders: any[] = [

]

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });

