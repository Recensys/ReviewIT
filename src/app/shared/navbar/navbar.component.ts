
import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";

import { UsernavComponent } from './usernav'


@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  directives: [ ROUTER_DIRECTIVES, UsernavComponent ],
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
