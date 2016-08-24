
import {ActivatedRoute} from '@angular/router';
import {COMMON_DIRECTIVES} from '@angular/common';
import {Component, OnDestroy, OnInit, Input} from '@angular/core';

import { APIService } from '../../services/api.service';
import { Field } from "../../field";
import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';
import { ReviewStrategyComponent } from '../review-strategy/review-strategy.component';

@Component({
    moduleId: module.id,
    selector: 'app-stageconfig',
    templateUrl: 'stageconfig.component.html',
    styleUrls: ['stageconfig.component.css'],
    directives: [ DND_DIRECTIVES, COMMON_DIRECTIVES, ReviewStrategyComponent ],
    providers: [ APIService ],
})

export class StageconfigComponent implements OnInit, OnDestroy {


    @Input() model: any;
    
    name: string;
    description: string;
    messages: any = {};


    availableFields: Array<Field> = [];
    visibleFields: Array<Field> = [];
    requestedFields: Array<Field> = [];

    constructor(
        private _api: APIService,
        private route: ActivatedRoute
        
    ) {    }

    private sub: any;


    ngOnInit() {
        this.availableFields.push(...this.model.AvailableFields);
    }


    saveDatafields(){
        this._api.SaveDatefields(this.model.Id, this.visibleFields, this.requestedFields).subscribe(
            status => this.messages.datafields = status,
            error => this.messages.datafields = error
        );
    }

    saveDetails(){
        this._api.SaveStageDetails(this.model.Id, this.name, this.description).subscribe(
            status => this.messages.details = status,
            error => this.messages.details = error
        )
    }

    resetDatafields(){
        this.availableFields = [];
        this.availableFields.push(...this.model.AvailableFields);
        this.visibleFields = [];
        this.requestedFields = [];
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }


    get diagnostic() { return JSON.stringify(this.model); }

    
}

