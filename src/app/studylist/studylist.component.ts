
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { StudyDetailsDTO } from '../model';
import { StudylistService } from './studylist.service';
import { MessageService } from '../core';


@Component({
  
  selector: 'app-studylist',
  templateUrl: 'studylist.component.html',
  styleUrls: ['studylist.component.css']
})
export class StudylistComponent implements OnInit {


  public model: StudyDetailsDTO[] = [];
  obs: any;

  constructor(
      private studylistService: StudylistService,
      private router: Router,
      private msgService: MessageService
    ) { }

  ngOnInit() {
    this.obs = this.studylistService.get();
    this.obs.subscribe(
      dto => this.model = dto,
      error => this.msgService.addError(error)
    )
  }

  continueStudy(studyId: number) {

  }

  studyConfig(studyId: number) {

  }

  newStudy() {
    var study = new StudyDetailsDTO();
    study.Name = 'New Study';
    this.studylistService.postStudy(study).subscribe(
      id => this.router.navigate([`config/${id}`]),
      error => this.msgService.addError(error)
    );
  }
}
