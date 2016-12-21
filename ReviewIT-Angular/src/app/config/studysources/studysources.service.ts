
import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {api} from '../../shared/globals'
import { ApiHelper } from '../../shared';

@Injectable()
export class StudysourcesService {

    constructor(
        private apihelper: ApiHelper,
        private http: Http
    ) { }
    
    


}