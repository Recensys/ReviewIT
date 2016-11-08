import { Component, Input, ViewContainerRef, ComponentFactoryResolver, ViewChild, OnInit, NgZone, ComponentRef} from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';

import { DataType, FieldDTO, DataDTO } from '../model/models';
import { BooleanFieldComponent } from './fields/boolean-field.component'
import { StringFieldComponent } from './fields/string-field.component'

@Component({
    selector: 'field-dyn',
    template: '<div #target></div>'
})

export class FieldDynComponent implements OnInit {

    @Input() field: FieldDTO;
    @Input() data: DataDTO;
    @Input() requested: Boolean;
    @ViewChild('target', { read: ViewContainerRef }) target: any;
    cmpRef: ComponentRef<any>

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    map = {
        0 : StringFieldComponent,
        1 : BooleanFieldComponent,
        //'2' : RadioField,
        //'3' : CheckboxField,      
        //'4' : NumberField,
        //'5' : ResourceField,
    }

    ngOnInit() {
        console.log('dyn field:', this);
        if (this.field !== undefined) {
            let factory = this.componentFactoryResolver.resolveComponentFactory(this.map[this.field.DataType]);
            this.cmpRef = this.target.createComponent(factory);
            this.cmpRef.instance.data = this.data;
            this.cmpRef.instance.field = this.field;
            this.cmpRef.instance.requested = this.requested;
        }

    }
}

