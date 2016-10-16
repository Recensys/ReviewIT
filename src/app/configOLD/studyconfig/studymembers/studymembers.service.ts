
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { api } from '../../../shared/globals';
import { ApiHelper } from '../../../shared';
import {ResearcherDetailsDTO,StudyResearcherDTO} from '../../../model/models'

@Injectable()
export class StudymembersService {

    constructor(
        private apihelper: ApiHelper,
        private http: Http
    ) { }
    
    public getResearchers(studyId: number): Observable<StudyResearcherDTO[]> {
        let url = `${api}/study/${studyId}/researchers`;
        return this.http.get(url, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    public search(str: string): Observable<StudyResearcherDTO[]> {
        let url = `${api}/users/${str}`;
        return this.http.get(url, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    public updateResearcher(studyId: number, researchers: StudyResearcherDTO[]): Observable<StudyResearcherDTO[]> {
        let url = `${api}/study/${studyId}/researchers`;
        let body = JSON.stringify(researchers);
        return this.http.put(url, body, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    public getAll(): Observable<ResearcherDetailsDTO[]> {
        let url = `${api}/users`;
        return this.http.get(url, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

}