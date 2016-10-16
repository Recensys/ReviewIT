import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';
import { StudydetailsService } from './studydetails.service';
import { StudyDetailsDTO } from '../../model/models'
import {Observable} from 'rxjs'

@Injectable()
export class StudydetailsResolve implements Resolve<StudyDetailsDTO> {
  constructor(private cs: StudydetailsService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<StudyDetailsDTO> {
    let id = +route.params['id'];
    return this.cs.get(id);
  }
}