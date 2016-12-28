import { Injectable } from '@angular/core'
import { Http, URLSearchParams } from '@angular/http'
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { httpService } from '../shared'
import { environment } from '../../environments/environment'
import { TaskOverviewDTO } from '../model/models'

@Injectable()
export class OverviewService{

    constructor(
        private http: httpService,
    ){}

    public get(studyId: number): Observable<TaskOverviewDTO> {
        let url = `study/${studyId}/overview`;
        return this.http.get(url);
    }

}