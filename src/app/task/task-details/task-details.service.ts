import { Injectable } from '@angular/core'
import { Http, Response, URLSearchParams } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { ApiHelper } from '../../shared';
import { ReviewTaskListDTO, ReviewTaskDTO } from '../../model';


@Injectable()
export class TaskDetailsService {
    constructor(
        private apihelper: ApiHelper,
        private http: Http
    ) { }

    public getTasks(userId: number, stageId: number): Observable<ReviewTaskListDTO> {
        let url = `${environment.api}tasks`;
        let params: URLSearchParams = new URLSearchParams();
        //params.set('appid', StaticSettings.API_KEY);
        params.set('uid', userId.toString());
        params.set('sid', stageId.toString());
        var options = this.apihelper.JsonOptions()
        options.search = params;
        return this.http.get(url, options)
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    public UpdateTask(dto: ReviewTaskDTO) {
        let url = `${environment.api}tasks`;
        return this.http.put(url, dto, this.apihelper.JsonOptions())
            .catch(this.apihelper.handleError);
    }


}

