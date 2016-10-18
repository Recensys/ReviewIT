
import {Injectable} from '@angular/core'

import { StageDetailsDTO } from '../../model/models';

@Injectable()
export class Sharedstagelist {
    
    constructor( ) { }

    details: StageDetailsDTO[] = [];
    
    get detailsList(){
        return this.details;
    }

    getDetail(id: number){
        return this.details.filter(d => d.Id === id)[0];
    }

}