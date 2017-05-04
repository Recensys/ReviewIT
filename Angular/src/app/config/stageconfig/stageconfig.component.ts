
import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageService } from '../../core';

@Component({
    
    selector: 'app-stageconfig',
    templateUrl: 'stageconfig.component.html',
    styleUrls: ['stageconfig.component.css'],
})

export class StageconfigComponent {


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private _msg: MessageService
    ) { }

    ngOnInit(){
        // bug: when reloading, the stage list hasn't been populated yet.
        // open stagedetails as default
        //this.router.navigate(['stagedetails'], {relativeTo: this.route});
    }
}
