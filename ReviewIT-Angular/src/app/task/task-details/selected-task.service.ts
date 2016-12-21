import { Injectable } from '@angular/core'
import { Http, Response, URLSearchParams } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { environment } from '../../../environments/environment';
import { ApiHelper } from '../../shared';
import { ReviewTaskListDTO, ReviewTaskDTO } from '../../model';


@Injectable()
export class SelectedTaskService {

    constructor(
    ) { }

    // Observable source
    private selectedSource = new BehaviorSubject<ReviewTaskDTO>(null);
    private hasPdfSource = new BehaviorSubject<boolean>(false);

    // Observable stream
    selected$ = this.selectedSource.asObservable();
    hasPdf$ = this.hasPdfSource.asObservable();

    // Service message command
    setSelected(input: ReviewTaskDTO) {
        this.selectedSource.next(input);
    }
    setHasPdf(input: boolean) {
        this.hasPdfSource.next(input);
    }

}

