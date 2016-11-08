
import {Component, Input} from '@angular/core';

import { FieldDTO, DataDTO, DataType } from '../../model/models'


@Component({
    selector: 'boolean-field',
    template: `
    <div class="btn-group">
        <p-radioButton [disabled]="!requested" name="groupname" label="Yes" value="true" [(ngModel)]="data.Value"></p-radioButton>
        <p-radioButton [disabled]="!requested" name="groupname" label="No" value="false" [(ngModel)]="data.Value"></p-radioButton>
    </div>`
})

export class BooleanFieldComponent {

    @Input() data: DataDTO;
    @Input() field: BooleanField;
    @Input() requested: Boolean;

    constructor() {
    }
}

export class BooleanField implements FieldDTO{
	Id: number;
    Name: string;
	Input: boolean;
	DataType: DataType = DataType.Boolean;
	Pick: string;
}