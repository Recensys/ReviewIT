import { Injectable } from '@angular/core'
import { Http, Response, URLSearchParams } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { httpService } from '../../shared';
import { ReviewTaskListDTO, ReviewTaskDTO } from '../../model';


@Injectable()
export class TaskDetailsService {
    constructor(
        private http: httpService
    ) { }

    public getTaskIds(stageId: number): Observable<ReviewTaskListDTO> {
        let url = `task`;
        var options = new URLSearchParams();
        options.set('sid', stageId.toString());
        return this.http.get(url, {search: options})
    }

    public UpdateTask(dto: ReviewTaskDTO) {
        let url = `task`;
        return this.http.put(url, dto)
    }


}

