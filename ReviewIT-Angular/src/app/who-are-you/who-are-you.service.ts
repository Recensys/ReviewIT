
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { ApiHelper } from '../shared';
import { UserDetailsDTO } from '../model/models';

@Injectable()
export class WhoAreYouService {

    constructor(
        private apihelper: ApiHelper,
        private http: Http
    ) { }

    public get(): Observable<UserDetailsDTO[]> {
        let url = `${environment.api}user`;
        return this.http.get(url, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    public create(dto: UserDetailsDTO): Observable<UserDetailsDTO> {
        let url = `${environment.api}user`;
        return this.http.post(url, dto, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    
}