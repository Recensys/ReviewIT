
import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { ApiHelper } from '../../shared';
import { FieldDTO } from '../../model/models';

@Injectable()
export class DatafieldeditorService {
    
    constructor(
        private apihelper: ApiHelper,
        private http: Http
    ) { }

    public get(studyId: number): Observable<FieldDTO[]> {
        let url = `${environment.api}study/${studyId}/field`;
        return this.http.get(url, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    public save(studyId: number, dtos: FieldDTO[]): Observable<boolean> {
        let url = `${environment.api}study/${studyId}/field`;
        let body = JSON.stringify(dtos);
        return this.http.put(url, dtos, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    

}