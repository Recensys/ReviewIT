import { Component, Input, ViewContainerRef, ComponentFactoryResolver, ViewChild, OnInit, NgZone, ComponentRef} from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';

import { DataType, FieldCriteriaDTO, DataDTO } from '../../model/models';
import { BooleanCriteriaComponent } from './dyn-criteria/boolean-criteria.component';

@Component({
    selector: 'dyn-criteria',
    template: '<div #target></div>'
})

export class DynCriteriaComponent implements OnInit {

    @Input() criteria: FieldCriteriaDTO;
    @ViewChild('target', { read: ViewContainerRef }) target: any;
    cmpRef: ComponentRef<any>

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    map = {
        //0 : StringFieldComponent,
        1 : BooleanCriteriaComponent,
        //'2' : RadioField,
        //'3' : CheckboxField,      
        //4 : NumberFieldComponent,
        //'5' : ResourceField,
    }

    ngOnInit() {
        if (this.criteria !== undefined) {
            let factory = this.componentFactoryResolver.resolveComponentFactory(this.map[this.criteria.Field.DataType]);
            this.cmpRef = this.target.createComponent(factory);
            this.cmpRef.instance.criteria = this.criteria;
        }

    }
}

