import { Component, OnInit } from '@angular/core';

import { Studydetails } from '../model';

@Component({
  moduleId: module.id,
  selector: 'app-studylist',
  templateUrl: 'studylist.component.html',
  styleUrls: ['studylist.component.css']
})
export class StudylistComponent implements OnInit {


  public studyDetails : Studydetails[];


  constructor() { }

  ngOnInit() {
    this.studyDetails = [
      {Id: 0, Name: "Study 1", Description: "Description of study 1, blah blah"},
      {Id: 1, Name: "Study 2", Description: "Description of study 2, blah blah"},
    ];
  }

  continueStudy(studyId: number){
    
  }

  studyConfig(studyId: number){

  }


}
