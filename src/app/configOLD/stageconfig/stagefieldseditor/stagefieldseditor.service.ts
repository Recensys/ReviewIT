import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';
import { ApiHelper } from '../../../shared';
import { StageFieldsDTO } from '../../../model';


@Injectable()
export class StagefieldseditorService
{
    constructor(
        private apihelper: ApiHelper,
        private http: Http
    ) { }

    public get(stageId: number): Observable<StageFieldsDTO> {
        let url = `${environment.api}stage/${stageId}/distribution`;
        return this.http.get(url, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }
}

