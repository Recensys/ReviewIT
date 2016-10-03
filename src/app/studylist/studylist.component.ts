
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { StudyDetailsDTO, StudyConfigDTO } from '../model';
import { StudylistService } from './studylist.service';
import { MessageService } from '../core';


@Component({
  moduleId: module.id,
  selector: 'app-studylist',
  templateUrl: 'studylist.component.html',
  styleUrls: ['studylist.component.css']
})
export class StudylistComponent implements OnInit {


  public model: StudyDetailsDTO[] = [];


  constructor(
      private studylistService: StudylistService,
      private router: Router,
      private msgService: MessageService
    ) { }

  ngOnInit() {
    this.studylistService.get().subscribe(
      dto => this.model = dto,
      error => this.msgService.addError(error)
    )
  }

  continueStudy(studyId: number) {

  }

  studyConfig(studyId: number) {

  }

  newStudy() {
    this.studylistService.postStudy(new StudyConfigDTO()).subscribe(
      id => this.router.navigate([`config/${id}`]),
      error => this.msgService.addError(error)
    );
  }
}
