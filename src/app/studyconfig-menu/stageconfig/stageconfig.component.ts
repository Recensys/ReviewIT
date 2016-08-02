
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
          this._api.GetFields(0).subscribe(
                    fieldArray => {
                        console.log(fieldArray);
                        this.availableFields = fieldArray
                    },
                    error => console.log(error)
                );
    }

    dropToVisible(field: Field){
        field.Input = false;
    }
    dropToRequested(field: Field){
        field.Input = true;
    }
    dropToAvailable(){}


    saveDatafields(){
        this._api.SaveDatefields(0, this.visibleFields, this.requestedFields).subscribe(
            status => this.messages.datafields = status,
            error => this.messages.datafields = error
        );
    }

    saveDetails(){
        this._api.SaveStageDetails(0, this.name, this.description).subscribe(
            status => this.messages.details = status,
            error => this.messages.details = error
        )
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }


    get diagnostic() { return JSON.stringify(this.model); }

    
}

