import { NgModule }       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* App Root */
import { NavbarModule } from './navbar';
import { HttpModule } from '@angular/http';
import { ReviewITAppComponent } from './app.component';
import { MessagesModule, GrowlModule } from 'primeng/primeng';
import { CoreModule } from './core/core.module';
import { PageNotFoundModule } from './page-not-found'

/* for config outlet */
import { FileUploadModule } from 'ng2-file-upload';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule, RadioButtonModule, AutoCompleteModule, SliderModule, ButtonModule, DropdownModule, TooltipModule } from 'primeng/primeng';

/* Feature Modules */
import {routing, routeProviders } from './app.routes'
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
		PageNotFoundModule,
		InputTextModule, RadioButtonModule, AutoCompleteModule, SliderModule, ButtonModule, DropdownModule, TooltipModule, ReactiveFormsModule, FileUploadModule
	],
	providers: [
		routeProviders,
	],
	bootstrap: [ReviewITAppComponent
	],
})
export class AppModule { }
