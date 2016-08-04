import { Component, OnInit } from '@angular/core';

import { StudylistComponent } from '../studylist';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  directives: [ StudylistComponent ],
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
