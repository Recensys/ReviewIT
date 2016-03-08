import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { TaskdetailsComponent } from './task-details.component';
import { TasklistComponent } from './task-list.component';

@Component({
    selector: 'autosys',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
    {
        path: '/list',
        name: 'List',
        component: TasklistComponent,
        useAsDefault: true
    },
    {
        path: '/details/:id',
        name: 'Details',
        component: TaskdetailsComponent 
    }
])
export class AutosysComponent {}
