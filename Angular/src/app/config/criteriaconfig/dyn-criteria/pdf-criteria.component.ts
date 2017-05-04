
import { Component, Input, OnInit } from '@angular/core';

import { FieldCriteriaDTO } from '../../../model/models'
import { SelectItem } from 'primeng/primeng';


@Component({
    selector: 'pdf-criteria',
    template: `
    not supported
    `
})

export class PdfCriteriaComponent {

    

    @Input() criteria: FieldCriteriaDTO;

    constructor() { }

    ngOnInit(){
        
    }
}