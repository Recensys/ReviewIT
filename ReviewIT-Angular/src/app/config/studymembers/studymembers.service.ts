
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { httpService } from '../../shared';
import { UserDetailsDTO, StudyMemberDTO } from '../../model/models'

@Injectable()
export class StudymembersService {

    constructor(
        private http: httpService
    ) { }
    
    public getResearchers(studyId: number): Observable<UserDetailsDTO[]> {
        return this.http.get(`study/${studyId}/studymember`)
    }

    public searchGlobalUsers(str: string): Observable<UserDetailsDTO[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('term', str);
        return this.http.get(`user/search`, {search: params})
    }

    public save(studyId: number, dtos: UserDetailsDTO[]): Observable<boolean> {
        return this.http.put(`study/${studyId}/studymember`, dtos)
    }


}