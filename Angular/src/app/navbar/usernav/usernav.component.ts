import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import { UserService } from '../../core';
import { UserDetailsDTO } from '../../model/models';


@Component({
  
  selector: 'app-usernav',
  templateUrl: 'usernav.component.html',
  styleUrls: ['usernav.component.css']
})
export class UsernavComponent implements OnInit {

  user: UserDetailsDTO;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.login$.subscribe(user => {
      this.user = user;
    });
  }

  logOut(){
    this._userService.logOut();
  }

  logIn(){
    this._userService.logIn();
  }


}
