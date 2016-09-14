import { NgModule }       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* App Root */
import { NavbarModule } from './navbar';
import { HttpModule } from '@angular/http';
import { ReviewITAppComponent } from './';
import { MessagesModule, GrowlModule } from 'primeng/primeng';
import { CoreModule } from './core/core.module';
import { PageNotFoundModule } from './page-not-found'

/* Feature Modules */
import { routing, routeProviders } from './'
import { HomeModule } from './home';


@NgModule({
	declarations: [
		ReviewITAppComponent,
		],
	imports: [
		HomeModule,
		NavbarModule,
		routing,
		BrowserModule,
		MessagesModule,
		GrowlModule,
		CoreModule,
		HttpModule,
		PageNotFoundModule
	],
	providers: [
		routeProviders,
	],
	bootstrap: [ReviewITAppComponent],
})
export class AppModule {}
