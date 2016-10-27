
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { ApiHelper } from '../../shared';
import { ResearcherDetailsDTO, StudyResearcherDTO } from '../../model/models'

@Injectable()
export class StudymembersService {

    constructor(
        private apihelper: ApiHelper,
        private http: Http
    ) { }
    
    public getResearchers(studyId: number): Observable<ResearcherDetailsDTO[]> {
        let url = `${environment.api}study/${studyId}/studymember`;
        return this.http.get(url, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    public searchGlobalUsers(str: string): Observable<ResearcherDetailsDTO[]> {
        let url = `${environment.api}user/search`;
        let params: URLSearchParams = new URLSearchParams();
        //params.set('appid', StaticSettings.API_KEY);
        params.set('term', str);
        var options = this.apihelper.JsonOptions()
        options.search = params;
        return this.http.get(url, options)
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    public save(studyId: number, dtos: ResearcherDetailsDTO[]): Observable<boolean> {
        let url = `${environment.api}study/${studyId}/studymember`;
        return this.http.put(url, dtos, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    // public updateResearcher(studyId: number, researchers: ResearcherDetailsDTO[]): Observable<boolean> {
    //     let url = `${environment.api}study/${studyId}/researchers`;
    //     let body = JSON.stringify(researchers);
    //     return this.http.put(url, body, this.apihelper.JsonOptions())
    //         .map(this.apihelper.extractJson)
    //         .catch(this.apihelper.handleError);
    // }

    // public getAll(): Observable<ResearcherDetailsDTO[]> {
    //     let url = `${environment.api}/users`;
    //     return this.http.get(url, this.apihelper.JsonOptions())
    //         .map(this.apihelper.extractJson)
    //         .catch(this.apihelper.handleError);
    // }

}