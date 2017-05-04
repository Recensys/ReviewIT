import { NgModule }       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* App Root */
import { NavbarModule } from './navbar';
import { HttpModule } from '@angular/http';
import { ReviewITAppComponent } from './app.component';
import { MessagesModule, GrowlModule } from 'primeng/primeng';
import { CoreModule } from './core/core.module';
import { PageNotFoundModule } from './page-not-found'
import { MaterialModule } from '@angular/material';
import { LoggedInGuard } from './loggedIn.guard'

/* Feature Modules */
import { routing, routeProviders } from './app.routes'
import { HomeModule } from './home';


/* test module */
import { TestModule } from './testcomponent/test.module'

/* global styles */
import '../styles/styles.scss';
import '../styles/headings.css';


@NgModule({
	declarations: [
		ReviewITAppComponent,
	],
	imports: [
		TestModule,
		HomeModule,
		NavbarModule,
		routing,
		BrowserModule,
		MessagesModule,
		GrowlModule,
		CoreModule,
		HttpModule,
		PageNotFoundModule,
		MaterialModule,
	],
	providers: [
		routeProviders,
		LoggedInGuard
	],
	bootstrap: [ReviewITAppComponent
	],
})
export class AppModule { }
