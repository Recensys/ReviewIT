import { Component, OnInit } from '@angular/core';

import { StudylistComponent } from '../studylist';
import { UserService } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  directives: [ StudylistComponent ],
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
