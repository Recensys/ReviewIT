
import { Component, Input, OnInit } from '@angular/core';

import { FieldCriteriaDTO } from '../../../model/models'
import { SelectItem } from 'primeng/primeng';


@Component({
    selector: 'string-criteria',
    template: `
    <div class="ui-g-3">
        {{criteria.Field.Name}}
        <div class="text-muted small">(string)</div>
    </div>
    <div class="ui-g-4">
        contains
    </div>
    <div class="ui-g-4" [style]="{'padding-top':'0px'}">
        <input type="text" [(ngModel)]="criteria.Value">
    </div>
    `
})

export class StringCriteriaComponent {

    

    @Input() criteria: FieldCriteriaDTO;

    constructor() { }

    ngOnInit(){
        
    }
}