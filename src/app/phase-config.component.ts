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

@Component({
    selector: 'phase-config',
    templateUrl: 'app/phase-config.component.html',
    directives: [ DND_DIRECTIVES, COMMON_DIRECTIVES ],
    providers: [ APIService ],
})

export class PhaseConfigComponent implements OnInit, OnDestroy {


    @Input()
    private phase: Phase;


    availableFields: Array<Field> = [];
    visibleFields: Array<Field> = [];
    requestedFields: Array<Field> = [];

    constructor(
        private _api: APIService,
        private route: ActivatedRoute
        
    ) {    }

    private sub: any;


    ngOnInit() {
          this._api.GetFields(1).subscribe(
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


    saveDatafields(){
        console.log('saving datafields');
        this._api.SaveDatefields(1, this.visibleFields, this.requestedFields).subscribe(
            res => console.log(res),
            error => console.log(error)
        );
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }



    
}
