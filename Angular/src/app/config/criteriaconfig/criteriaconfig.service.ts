
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { httpService } from '../../shared';
import { CriteriaDTO, FieldDTO } from '../../model/models'

@Injectable()
export class CriteriaconfigService {

    constructor(
        private http: httpService
    ) { }
    
    search(studyId: number, str: string): Observable<FieldDTO[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('term', str);
        let url = `study/${studyId}/field/search`;
        return this.http.get(url, {search: params})
    }

    public get(studyId: number): Observable<CriteriaDTO> {
        let url = `study/${studyId}/criteria`;
        return this.http.get(url)
    }

    public save(studyId: number, dto: CriteriaDTO): Observable<boolean> {
        let url = `study/${studyId}/criteria`;
        return this.http.put(url, dto)
    }


}