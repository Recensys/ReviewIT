
import {Component, Input} from '@angular/core';

import { FieldDTO, DataType, DataDTO } from '../../model/models'
import {Data} from '../../model/data';

@Component({
    selector: 'string-field',
    template: `
    <div *ngIf="requested">
        <input type="text" class="form-control" [(ngModel)]="data.Value">
    </div>
    <div *ngIf="!requested">
        {{data.Value}}
    </div>
    `
})
export class StringFieldComponent {

    @Input() data: DataDTO;
    @Input() field: StringField;
    @Input() requested: Boolean;

    constructor() { }

}

export class StringField implements FieldDTO{
	Id: number;
    Name: string;
	DataType: DataType = DataType.String;
}