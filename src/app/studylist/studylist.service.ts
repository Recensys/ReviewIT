
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import Globals = require('../shared/globals');
import { ApiHelper } from '../shared';
import { StudyDetails, Study } from '../model/models';

@Injectable()
export class StudylistService {

    constructor(
        private apihelper: ApiHelper,
        private http: Http
    ) { }

    public get(): Observable<StudyDetails[]> {
        let url = `${Globals.api}study/`;
        return this.http.get(url, this.apihelper.AuthOptions)
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    public postStudy(study: Study): Observable<Study> {
        let url = `${Globals.api}study/`;
        let body = JSON.stringify(study);
        return this.http.post(url, body, this.apihelper.AuthOptions)
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }


}