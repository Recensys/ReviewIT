import { Component, Input, ViewContainerRef, ComponentFactoryResolver, ViewChild, OnInit, NgZone, ComponentRef} from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';


import { ButtonRadioDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { DataType } from '../model/models';
import {Field} from './field';
import {Data} from '../model/data';
import {BooleanFieldComponent} from './fields/boolean-field.component'

@Component({
    moduleId: module.id,
    selector: 'field-dyn',
    template: 'dynfield:<div #target></div>'
})

export class FieldDynComponent implements OnInit {

    @Input() field: Field;
    @Input() data: Data;
    @ViewChild('target', { read: ViewContainerRef }) target: any;
    cmpRef: ComponentRef<any>

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    map = {
        //'0' : StringField,
        '1': BooleanFieldComponent,
        //'2' : RadioField,
        //'3' : CheckboxField,      
        //'4' : NumberField,
        //'5' : ResourceField,
    }

    ngOnInit() {
        if (this.field !== undefined) {
            let factory = this.componentFactoryResolver.resolveComponentFactory(this.map[this.field.Type]);
            this.cmpRef = this.target.createComponent(factory);
            this.cmpRef.instance.data = this.data;
            this.cmpRef.instance.field = this.field;
        }

    }
}

