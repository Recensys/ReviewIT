
import { Component, Input } from '@angular/core';

import { FieldCriteriaDTO } from '../../../model/models'
import { SelectItem } from 'primeng/primeng';


@Component({
    selector: 'number-criteria',
    template: `
    <div class="ui-g-3">
        {{criteria.Field.Name}}
        <div class="text-muted small" >(number)</div>
    </div>
    <div class="ui-g-4">
        <p-dropdown [options]="operators" [(ngModel)]="criteria.Operator" [style]="{'width':'120px'}"></p-dropdown>
    </div>
    <div class="ui-g-4" [style]="{'padding-top':'0px'}">
        <input type="number" [(ngModel)]="criteria.Value">
    </div>
    `
})

export class NumberCriteriaComponent {

    operators: SelectItem[] = [
        { label: 'Larger than', value: '>' },
        { label: 'Smaller than', value: '<' },
    ]

    @Input() criteria: FieldCriteriaDTO;

    constructor() {
    }
}