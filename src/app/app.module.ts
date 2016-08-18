import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, Component, ViewContainerRef } from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {CookieService} from 'angular2-cookie/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {DND_PROVIDERS} from 'ng2-dnd/ng2-dnd';
import {Ng2BootstrapConfig, Ng2BootstrapTheme} from 'ng2-bootstrap/ng2-bootstrap'; 

import { UserService } from './shared'

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReviewITAppComponent, environment, APP_ROUTER_PROVIDERS, LoggedInGuard } from './';



@NgModule({
    declarations:   [ReviewITAppComponent],
    imports:        [ BrowserModule,
                ],
    providers:      [
                    LoggedInGuard, 
                    APP_ROUTER_PROVIDERS,
                    HTTP_PROVIDERS, 
                    CookieService, 
                    DND_PROVIDERS, 
                    UserService,
                    disableDeprecatedForms(),
                    provideForms()
                ],
    bootstrap:    [ReviewITAppComponent],
})
export class AppModule {}