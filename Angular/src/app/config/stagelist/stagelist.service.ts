
import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { httpService } from '../../shared';
import { StageDetailsDTO } from '../../model/models';

@Injectable()
export class StagelistService {
    
    constructor(
        private http: httpService
    ) { }

    public get(studyId: number): Observable<StageDetailsDTO[]> {
        let url = `study/${studyId}/stages`;
        return this.http.get(url)
    }

    public create(studyId: number, dto: StageDetailsDTO): Observable<number> {
        let url = `study/${studyId}/stage`;
        return this.http.post(url, dto)
    }

    

}