import { Component, OnInit, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";

import { UserService } from '../../services';


@Component({
  moduleId: module.id,
  selector: 'app-usernav',
  directives: [ROUTER_DIRECTIVES],
  providers: [ UserService ],
  templateUrl: 'usernav.component.html',
  styleUrls: ['usernav.component.css']
})
export class UsernavComponent implements OnInit {

  user: any;

  constructor(private _userService: UserService) { 
    
  }

  ngOnInit() {
    this._userService.login$.subscribe(e => {
      this.user = e;
      console.log(e);
    });
  }

  logOut(){
  }

}
