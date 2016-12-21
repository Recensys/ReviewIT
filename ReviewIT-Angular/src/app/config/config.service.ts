
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { ApiHelper } from '../shared';

@Injectable()
export class ConfigService {

    constructor(
        private apihelper: ApiHelper,
        private http: Http
    ) { }
    
    public startStudy(studyId: number): Observable<number> {
        let url = `${environment.api}study/${studyId}/start`;
        return this.http.get(url, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }



}