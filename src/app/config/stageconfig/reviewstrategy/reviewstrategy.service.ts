
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';
import { ApiHelper } from '../../../shared';
import { ResearcherDetailsDTO, DistributionDTO } from '../../../model/models'

@Injectable()
export class ReviewstrategyService {

    constructor(
        private apihelper: ApiHelper,
        private http: Http
    ) { }
    
    search(studyId: number, str: string): Observable<ResearcherDetailsDTO[]> {
        let params: URLSearchParams = new URLSearchParams();
        //params.set('appid', StaticSettings.API_KEY);
        params.set('term', str);
        var options = this.apihelper.JsonOptions()
        options.search = params;
        let url = `${environment.api}study/${studyId}/users`;
        return this.http.get(url, options)
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    getAllResearchers(studyId: number): Observable<ResearcherDetailsDTO[]> {
        let url = `${environment.api}study/${studyId}/users`;
        return this.http.get(url, this.apihelper.JsonOptions())
            .map(this.apihelper.extractJson)
            .catch(this.apihelper.handleError);
    }

    // public get(studyId: number): Observable<CriteriaDTO> {
    //     let url = `${environment.api}study/${studyId}/criteria`;
    //     return this.http.get(url, this.apihelper.JsonOptions())
    //         .map(this.apihelper.extractJson)
    //         .catch(this.apihelper.handleError);
    // }

    // public save(studyId: number, dto: CriteriaDTO): Observable<boolean> {
    //     let url = `${environment.api}study/${studyId}/criteria`;
    //     return this.http.put(url, dto, this.apihelper.JsonOptions())
    //         .map(this.apihelper.extractJson)
    //         .catch(this.apihelper.handleError);
    // }


}