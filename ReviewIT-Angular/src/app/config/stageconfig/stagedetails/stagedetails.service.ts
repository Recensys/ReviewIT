
import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';
import { ApiHelper } from '../../../shared';
import { StageDetailsDTO } from '../../../model/models';

@Injectable()
export class StagedetailsService {
    
    constructor(
        private apihelper: ApiHelper,
        private http: Http
    ) { }

    public save(dto: StageDetailsDTO): Observable<boolean> {
        let url = `${environment.api}stage`;
        let body = JSON.stringify(dto);
        return this.http.put(url, dto, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    

}