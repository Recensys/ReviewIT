
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { ApiHelper } from '../shared';
import { StudyDetailsDTO } from '../model/models';
import { httpService } from '../shared/authHttp.service'

@Injectable()
export class StudylistService {

    constructor(
        private apihelper: ApiHelper,
        private http: httpService,
    ) { }

    public get(): Observable<StudyDetailsDTO[]> {
        return this.http.get('study/list')
    }

    public postStudy(study: StudyDetailsDTO): Observable<number> {
        return this.http.post('study', study)
    }


}