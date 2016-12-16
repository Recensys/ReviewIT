import { Injectable } from '@angular/core'
import { Http, URLSearchParams } from '@angular/http'
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiHelper } from '../shared'
import { environment } from '../../environments/environment'
import { TaskOverviewDTO } from '../model/models'

@Injectable()
export class OverviewService{

    constructor(
        private http: Http,
        private apihelper: ApiHelper
    ){}

    public get(studyId: number): Observable<TaskOverviewDTO> {
        let url = `${environment.api}study/${studyId}/overview`;
        return this.http.get(url, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

}