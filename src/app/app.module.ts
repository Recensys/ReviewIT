import { NgModule }       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* App Root */
import { NavbarModule } from './navbar';
import { HttpModule } from '@angular/http';
import { ReviewITAppComponent, LoggedInGuard } from './';
import { MessagesModule, GrowlModule } from 'primeng/primeng';
import { CoreModule } from './core/core.module'

/* Feature Modules */
import { routing } from './review-it.routes'
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
		HttpModule
	],
	providers: [
		LoggedInGuard,
	],
	bootstrap: [ReviewITAppComponent],
})
export class AppModule {}
