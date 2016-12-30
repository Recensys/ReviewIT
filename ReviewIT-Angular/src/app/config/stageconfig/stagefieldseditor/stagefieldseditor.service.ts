import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';
import { httpService } from '../../../shared';
import { StageFieldsDTO } from '../../../model';


@Injectable()
export class StagefieldseditorService
{
    constructor(
        private http: httpService
    ) { }

    public get(stageId: number): Observable<StageFieldsDTO> {
        let url = `stage/${stageId}/stagefield`;
        return this.http.get(url)
    }

    public save(stageId: number, dto: StageFieldsDTO): Observable<boolean> {
        let url = `stage/${stageId}/stagefield`;
        return this.http.put(url, dto)
    }
}

