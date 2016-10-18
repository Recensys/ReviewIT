
import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { MessageService } from '../core';

@Component({
    
    selector: 'app-config',
    templateUrl: 'config.component.html',
    styleUrls: ['config.component.css'],
})

export class ConfigComponent {


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private _msg: MessageService
    ) { }

    ngOnInit(){
        // open studydetails as default
        this.router.navigate(['studydetails'], {relativeTo: this.route});
    }
}
