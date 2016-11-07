import { Injectable } from '@angular/core'
import { Http, URLSearchParams } from '@angular/http'
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiHelper } from '../shared'
import { environment } from '../../environments/environment'
import { ReviewTaskListDTO } from '../model/models'

@Injectable()
export class TaskDashboardService{

    constructor(
        private http: Http,
        private apihelper: ApiHelper
    ){}

    public getTasks(userId: number, stageId: number): Observable<ReviewTaskListDTO> {
        let url = `${environment.api}tasks`;
        let params: URLSearchParams = new URLSearchParams();
        params.set('uid', userId.toString());
        params.set('sid', stageId.toString());
        var options = this.apihelper.JsonOptions()
        options.search = params;
        return this.http.get(url, options)
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

}