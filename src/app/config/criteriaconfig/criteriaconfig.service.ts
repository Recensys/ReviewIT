
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { api } from '../../shared/globals';
import { ApiHelper } from '../../shared';
import { CriteriaDTO, FieldDTO } from '../../model/models'

@Injectable()
export class CriteriaconfigService {

    constructor(
        private apihelper: ApiHelper,
        private http: Http
    ) { }
    
    public search(studyId: number, str: string): Observable<FieldDTO[]> {
        let params: URLSearchParams = new URLSearchParams();
        //params.set('appid', StaticSettings.API_KEY);
        params.set('term', str);
        var options = this.apihelper.JsonOptions()
        options.search = params;

        let url = `${api}/study/${studyId}/fields/search`;
        return this.http.get(url, options)
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    // public updateResearcher(studyId: number, researchers: StudyResearcherDTO[]): Observable<StudyResearcherDTO[]> {
    //     let url = `${api}/study/${studyId}/researchers`;
    //     let body = JSON.stringify(researchers);
    //     return this.http.put(url, body, this.apihelper.JsonOptions())
    //         .map(this.apihelper.extractJson)
    //         .catch(this.apihelper.handleError);
    // }

    // public getAll(): Observable<ResearcherDetailsDTO[]> {
    //     let url = `${api}/users`;
    //     return this.http.get(url, this.apihelper.JsonOptions())
    //         .map(this.apihelper.extractJson)
    //         .catch(this.apihelper.handleError);
    // }

}