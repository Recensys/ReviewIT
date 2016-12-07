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

    public getTasks(stageId: number): Observable<ReviewTaskListDTO> {
        let url = `${environment.api}tasks`;
        var options = this.apihelper.UidJsonOptions();
        options.search.set('sid', stageId.toString());
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

