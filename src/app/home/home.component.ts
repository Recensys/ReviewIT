import { Component, OnInit } from '@angular/core';

import { UserService } from '../core';
import {DatafieldeditorComponent} from '../studyconfig-menu/datafieldeditor'

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
