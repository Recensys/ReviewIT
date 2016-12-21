
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { ApiHelper } from '../shared';
import { StudyDetailsDTO } from '../model/models';

@Injectable()
export class StudylistService {

    constructor(
        private apihelper: ApiHelper,
        private http: Http,
    ) { }

    public get(): Observable<StudyDetailsDTO[]> {
        
        let url = `${environment.api}study/list`;
        return this.http.get(url, this.apihelper.UidJsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    public postStudy(study: StudyDetailsDTO): Observable<number> {
        let url = `${environment.api}study`;
        let body = JSON.stringify(study);
        return this.http.post(url, body, this.apihelper.UidJsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }


}