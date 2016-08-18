import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, Component, ViewContainerRef } from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {CookieService} from 'angular2-cookie/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {DND_PROVIDERS} from 'ng2-dnd/ng2-dnd';
import {Ng2BootstrapConfig, Ng2BootstrapTheme} from 'ng2-bootstrap/ng2-bootstrap'; 
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms';

import { UserService } from './shared';
import { TaskDetailsComponent, TasklistComponent } from './task';
import { taskRoutes } from './task/task.routes';
import { LoginComponent } from './login';
import { SignupComponent } from './signup';
import { StudyconfigMenuComponent } from './studyconfig-menu/studyconfig-menu.component';
import { PageNotFoundComponent } from './page-not-found';
import { HomeComponent } from './home';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ReviewITAppComponent, environment, APP_ROUTER_PROVIDERS, LoggedInGuard } from './';



@NgModule({
    // TODO: depend on modules instead of importing components here
    declarations:   [ReviewITAppComponent, HomeComponent, SignupComponent, LoginComponent, StudyconfigMenuComponent, PageNotFoundComponent, TaskDetailsComponent, TasklistComponent],
    imports:        [   BrowserModule,
                        FormsModule,
                        RouterModule.forRoot([
                                            { path: '', component: HomeComponent },
                                            { path: 'login', component: LoginComponent },
                                            { path: 'signup', component: SignupComponent },
                                            { path: 'study/:id', children: [
                                                { path: 'config', component: StudyconfigMenuComponent, canActivate: [LoggedInGuard] },
                                                ...taskRoutes,
                                            ]},
                                            { path: '**', component: PageNotFoundComponent },
                                        ], LoggedInGuard),
                ],
    providers:      [
                    HTTP_PROVIDERS, 
                    CookieService, 
                    DND_PROVIDERS, 
                    UserService,
                    LoggedInGuard
                ],
    bootstrap:    [ReviewITAppComponent],
})
export class AppModule {}