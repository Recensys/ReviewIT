import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found';
import { HomeComponent } from './home/home.component'
import { LoggedInGuard } from './loggedIn.guard'

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		children: [
			{
				path: '',
				component: HomeComponent,
			},
			{
				path: 'config',
				canLoad: [ LoggedInGuard ],
				loadChildren:
				'app/config/config.module#ConfigModule'
			},
			{
				path: 'task',
				canLoad: [ LoggedInGuard ],
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

