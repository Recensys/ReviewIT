
import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { MessageService } from '../core';

@Component({
    
    selector: 'app-config',
    templateUrl: 'config.component.html',
    styleUrls: ['config.component.css'],
})

export class ConfigComponent {


    constructor(
        private route: ActivatedRoute,
        private _msg: MessageService
    ) { }
}
