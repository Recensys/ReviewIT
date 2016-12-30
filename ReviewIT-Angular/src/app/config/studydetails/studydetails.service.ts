import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { httpService } from '../../shared';
import { StudyDetailsDTO } from '../../model/models';

@Injectable()
export class StudydetailsService {

    constructor(
        private http: httpService
    ) { }

    public get(id: number): Observable<StudyDetailsDTO> {
        let url = `study/${id}`;
        return this.http.get(url)
    }

    public update(model: StudyDetailsDTO): Observable<boolean> {
        let url = `study`;
        let body = JSON.stringify(model);
        return this.http.put(url, body)
    }

    public delete(id: number) {
        let url = `study/${id}`;
        return this.http.delete(url)
    }


}