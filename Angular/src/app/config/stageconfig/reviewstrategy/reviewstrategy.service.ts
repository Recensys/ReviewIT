
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../../../environments/environment';
import { httpService } from '../../../shared';
import { StudyMemberDTO, DistributionDTO } from '../../../model/models'

@Injectable()
export class ReviewstrategyService {

    constructor(
        private http: httpService
    ) { }
    
    search(studyId: number, str: string): Observable<StudyMemberDTO[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('term', str);
        let url = `study/${studyId}/studymember`;
        return this.http.get(url, {search: params})
    }

    getAllResearchers(studyId: number): Observable<StudyMemberDTO[]> {
        let url = `study/${studyId}/studymember`;
        return this.http.get(url)
    }

    public get(stageId: number): Observable<DistributionDTO> {
        let url = `stage/${stageId}/distribution`;
        return this.http.get(url)
    }

    public save(stageId: number, dto: DistributionDTO): Observable<boolean> {
        let url = `stage/${stageId}/distribution`;
        return this.http.put(url, dto)
    }


}