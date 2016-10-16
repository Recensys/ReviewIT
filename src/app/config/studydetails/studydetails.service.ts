import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { ApiHelper } from '../../shared';
import { StudyDetailsDTO } from '../../model/models';

@Injectable()
export class StudydetailsService {

    constructor(
        private apihelper: ApiHelper,
        private http: Http
    ) { }

    public get(id: number): Observable<StudyDetailsDTO> {
        let url = `${environment.api}study/${id}`;
        return this.http.get(url, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    public update(model: StudyDetailsDTO): Observable<boolean> {
        let url = `${environment.api}study`;
        let body = JSON.stringify(model);
        return this.http.put(url, body, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }


}