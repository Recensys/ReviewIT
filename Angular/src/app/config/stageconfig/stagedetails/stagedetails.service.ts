
import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';
import { httpService } from '../../../shared';
import { StageDetailsDTO } from '../../../model/models';

@Injectable()
export class StagedetailsService {
    
    constructor(
        private http: httpService
    ) { }

    public save(dto: StageDetailsDTO): Observable<boolean> {
        let url = `stage`;
        return this.http.put(url, dto)
    }

    

}