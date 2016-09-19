import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import { UserService } from '../../core';
import { User } from '../../model';


@Component({
  moduleId: module.id,
  selector: 'app-usernav',
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
    console.log(this.user);
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
