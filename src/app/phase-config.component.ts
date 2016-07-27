/**
 * Created by jbec on 11/07/2016.
 */

import {ActivatedRoute} from '@angular/router';
import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {APIService} from './services/api.service';
import {Phase} from './model/phase.model';
import {DraglistDirective} from './directives/draglist.directive';
import {Field} from "./model/field";
import {NumberField} from "./fields/number.field";
import {StringField} from "./fields/string.field";
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {COMMON_DIRECTIVES} from '@angular/common';
import {ReviewStrategyComponent} from './review-strategy.component';

@Component({
    selector: 'phase-config',
    templateUrl: 'app/phase-config.component.html',
    directives: [ DND_DIRECTIVES, COMMON_DIRECTIVES, ReviewStrategyComponent ],
    providers: [ APIService ],
})

export class PhaseConfigComponent implements OnInit, OnDestroy {


    @Input() private phase: Phase;
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
        this._api.SaveDatefields(1, this.visibleFields, this.requestedFields).subscribe(
            status => this.messages.datafields = status,
            error => this.messages.datafields = error
        );
    }

    saveDetails(){
        this._api.SaveStageDetails(1, this.name, this.description).subscribe(
            status => this.messages.details = status,
            error => this.messages.details = error
        )
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }



    
}
