
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { ApiHelper } from '../shared';
import { StudyConfigDTO } from '../model/models';

@Injectable()
export class ConfigService {

    constructor(
        private apihelper: ApiHelper,
        private http: Http
    ) { }

    public get(id: number): Observable<StudyConfigDTO> {
        let url = `${environment.api}study/${id}/config`;
        return this.http.get(url, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    

    public updateConfig(model: StudyConfigDTO): Observable<boolean> {
        let url = `${environment.api}study/${model.Id}/config`;
        let body = JSON.stringify(model);
        return this.http.put(url, body, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    public deleteStudy(id: number){
        let url = `${environment.api}study/${id}`;
        return this.http.delete(url, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

}