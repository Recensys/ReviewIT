
import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { ApiHelper } from '../../shared';
import { StageDetailsDTO } from '../../model/models';

@Injectable()
export class StagelistService {
    
    constructor(
        private apihelper: ApiHelper,
        private http: Http
    ) { }

    public get(studyId: number): Observable<StageDetailsDTO[]> {
        let url = `${environment.api}study/${studyId}/stages`;
        return this.http.get(url, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    public create(studyId: number, dto: StageDetailsDTO): Observable<number> {
        let url = `${environment.api}study/${studyId}/stage`;
        let body = JSON.stringify(dto);
        return this.http.post(url, dto, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    

}