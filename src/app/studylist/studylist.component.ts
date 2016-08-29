
import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from "@angular/router";

import { Studydetails } from '../model';
import { APIService } from '../services/api.service';


@Component({
  moduleId: module.id,
  selector: 'app-studylist',
  directives: [ROUTER_DIRECTIVES],
  providers: [APIService],
  templateUrl: 'studylist.component.html',
  styleUrls: ['studylist.component.css']
})
export class StudylistComponent implements OnInit {


  public studyDetails : Studydetails[] = [];

  

  constructor(private _api: APIService, private router: Router) { }

  ngOnInit() {
    this._api.getStudies().subscribe(
      studies => {
        this.studyDetails = studies
        },
      error => console.log(error)
    );
  }

  continueStudy(studyId: number){
    
  }

  studyConfig(studyId: number){

  }

  newStudy(){
      this._api.newStudy().subscribe(
        id => {
          this.router.navigate([`study/${id}/config`]);
        },
        error => console.log(error)
      )
  }
}
