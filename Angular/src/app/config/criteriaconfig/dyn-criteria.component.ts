import { Component, Input, ViewContainerRef, ComponentFactoryResolver, ViewChild, OnInit, NgZone, ComponentRef } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';

import { DataType, FieldCriteriaDTO, DataDTO } from '../../model/models';
import { BooleanCriteriaComponent } from './dyn-criteria/boolean-criteria.component';
import { NumberCriteriaComponent } from './dyn-criteria/number-criteria.component';
import { StringCriteriaComponent } from './dyn-criteria/string-criteria.component';
import { PdfCriteriaComponent } from './dyn-criteria/pdf-criteria.component';

@Component({
    selector: 'dyn-criteria',
    template: '<div #target></div>'
})

export class DynCriteriaComponent implements OnInit {

    @Input() criteria: FieldCriteriaDTO;
    @ViewChild('target', { read: ViewContainerRef }) target: any;
    cmpRef: ComponentRef<any>

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

    map = {
        0: StringCriteriaComponent,
        1: BooleanCriteriaComponent,
        //'2' : RadioField,
        //'3' : CheckboxField,      
        4: NumberCriteriaComponent,
        // 5: resourceField
        6: PdfCriteriaComponent,
    }

    ngOnInit() {
        if (this.criteria !== undefined) {
            let comp = this.map[this.criteria.Field.DataType];
            if (comp) {
                let factory = this.componentFactoryResolver.resolveComponentFactory(comp);
                this.cmpRef = this.target.createComponent(factory);
                this.cmpRef.instance.criteria = this.criteria;
            }else{
                console.log('field for criteria with type: ' + this.criteria.Field.DataType + ' not found!');
            }

        }

    }
}

