
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Study, StudyDetails} from '../model';
import { StudylistService } from './studylist.service';
import { MessageService } from '../core';


@Component({
  moduleId: module.id,
  selector: 'app-studylist',
  templateUrl: 'studylist.component.html',
  styleUrls: ['studylist.component.css']
})
export class StudylistComponent implements OnInit {


  public model: StudyDetails[] = [];


  constructor(
      private studylistService: StudylistService,
      private router: Router,
      private msgService: MessageService
    ) { }

  ngOnInit() {
    this.studylistService.get().subscribe(
      studies => {
        this.model = studies;
        console.log(this.model);
      },
      error => console.log(error)
    );
  }

  continueStudy(studyId: number) {

  }

  studyConfig(studyId: number) {

  }

  newStudy() {
    // this.studylistService.postStudy(new Study()).subscribe(
    //   study => this.router.navigate([`study/${study.Id}/config`]),
    //   error => this.msgService.addError(error)
    // );
  }
}
