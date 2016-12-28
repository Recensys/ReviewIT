
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { httpService } from '../shared';

@Injectable()
export class ConfigService {

    constructor(
        private http: httpService
    ) { }
    
    public startStudy(studyId: number): Observable<number> {
        return this.http.get(`study/${studyId}/start`);
    }

}