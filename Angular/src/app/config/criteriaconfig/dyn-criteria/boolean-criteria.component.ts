
import { Component, Input } from '@angular/core';

import { FieldCriteriaDTO } from '../../../model/models'
import { SelectItem } from 'primeng/primeng';


@Component({
    selector: 'boolean-criteria',
    template: `
    <div class="ui-g-3">
        {{criteria.Field.Name}}
        <div class="text-muted small" >(boolean)</div>
    </div>
    <div class="ui-g-4">
        <p-dropdown [options]="operators" [(ngModel)]="criteria.Operator" [style]="{'width':'120px'}"></p-dropdown>
    </div>
    <div class="ui-g-4" [style]="{'padding-top':'0px'}">
        <div class="ui-g">
            <div class="ui-g-6"><p-radioButton name="inclgroup" value="true" [(ngModel)]="criteria.Value" label="Yes"></p-radioButton></div>
            <div class="ui-g-6"><p-radioButton name="inclgroup" value="false" [(ngModel)]="criteria.Value" label="No"></p-radioButton></div>
        </div>
    </div>
    `
})

export class BooleanCriteriaComponent {

    operators: SelectItem[] = [
        { label: 'Equals', value: '==' },
        { label: 'Different from', value: '!=' },
    ]

    @Input() criteria: FieldCriteriaDTO;

    constructor() {
    }
}