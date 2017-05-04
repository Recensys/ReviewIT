import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { httpService } from '../../shared'
import { environment } from '../../../environments/environment'
import { StageDetailsDTO } from '../../model/models'

@Injectable()
export class StagelistService{

    constructor(
        private http: httpService,
    ){}

    public get(studyId: number): Observable<StageDetailsDTO[]> {
        let url = `study/${studyId}/stages`;
        return this.http.get(url);
    }

}