import { Injectable } from '@angular/core'
import { Http, Response, URLSearchParams } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';
import { ApiHelper } from '../../../shared';
import { ReviewTaskListDTO, ReviewTaskDTO } from '../../../model';


@Injectable()
export class TaskContentService {
    constructor(
        private apihelper: ApiHelper,
        private http: Http
    ) { }

    public getTask(id: number) {
        let url = `${environment.api}task/${id}`;
        return this.http.get(url, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    public UpdateTask(dto: ReviewTaskDTO) {
        let url = `${environment.api}task`;
        return this.http.put(url, dto, this.apihelper.JsonOptions())
            .catch(this.apihelper.handleError);
    }


}

