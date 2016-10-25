import {Component, Input} from '@angular/core';

import { FieldDTO } from '../../model/models'

import {Data} from '../../model/data';
import {Field} from '../field';


@Component({
    selector: 'boolean-field',
    template: `
    <div class="btn-group">
        <label class="btn btn-secondary" *ngFor="let item of field.Options">
            <input type="radio"
            [name]="data.Id"
            (click)="field.Pick = item"
            [checked]="item === field.Pick">
            {{item}}
        </label>
    </div>`
})
export class BooleanFieldComponent {

    @Input() data: Data;
    @Input() field: FieldDTO;

    constructor() {
    }
}