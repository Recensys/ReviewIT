import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";
import {Subscription} from 'rxjs/Subscription';

import { UserService } from '../../services';
import { User } from '../../../model';


@Component({
  moduleId: module.id,
  selector: 'app-usernav',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'usernav.component.html',
  styleUrls: ['usernav.component.css']
})
export class UsernavComponent implements OnInit, OnDestroy {

  user: User;
  subscription: Subscription;

  constructor(private _userService: UserService) { 
    
  }

  ngOnInit() {
    this.user = this._userService.user;
    this.subscription = this._userService.login$.subscribe(user => {
      this.user = user;
    });
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  logOut(){
    this._userService.logOut();
  }


}
