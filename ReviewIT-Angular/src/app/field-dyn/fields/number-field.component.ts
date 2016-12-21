
import {Component, Input} from '@angular/core';

import { FieldDTO, DataType, DataDTO } from '../../model/models'

@Component({
    selector: 'number-field',
    template: `
    <div *ngIf="requested">
        <input type="number" class="form-control" [(ngModel)]="data.Value">
    </div>
    <div *ngIf="!requested">
        {{data.Value}}
    </div>
    `
})
export class NumberFieldComponent {

    @Input() data: DataDTO;
    @Input() field: NumberField;
    @Input() requested: Boolean;

    constructor() { }

}

export class NumberField implements FieldDTO{
	Id: number;
    Name: string;
	DataType: DataType = DataType.Number;
}