import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

import { TestService } from './test.service'

@Component({
    selector: 'app-test',
    templateUrl: 'test.component.html'
})
export class TestComponent
{

    obs: Observable<any>;

    constructor(
        private api: TestService
    ){}

    ngOnInit(){
        this.obs = this.api.getResearchers(1);
    }

    

}