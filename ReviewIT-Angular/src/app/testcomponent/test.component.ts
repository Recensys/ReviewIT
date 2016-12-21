import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

import { TestService } from './test.service'
import { FieldDTO, DataType, DataDTO } from '../model/models'

@Component({
    selector: 'app-test',
    templateUrl: 'test.component.html'
})
export class TestComponent
{

    obs: Observable<any>;
    field: FieldDTO;
    data: DataDTO;


    constructor(
        private api: TestService
    ){}

    ngOnInit(){
        // this.obs = this.api.getResearchers(1);

        this.field = new FieldDTO();
        this.field.DataType = DataType.Resource;
        this.field.Name = "pdf";

        this.data = new DataDTO();
        this.data.Value = "https://www.ics.uci.edu/~corps/phaseii/Weiser-Computer21stCentury-SciAm.pdf";
    }

    

}