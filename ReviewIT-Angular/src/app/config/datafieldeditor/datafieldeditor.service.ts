
import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { httpService } from '../../shared';
import { FieldDTO } from '../../model/models';

@Injectable()
export class DatafieldeditorService {
    
    constructor(
        private http: httpService
    ) { }

    public get(studyId: number): Observable<FieldDTO[]> {
        let url = `study/${studyId}/field`;
        return this.http.get(url)
    }

    public save(studyId: number, dtos: FieldDTO[]): Observable<boolean> {
        let url = `study/${studyId}/field`;
        return this.http.put(url, dtos)
    }

    

}