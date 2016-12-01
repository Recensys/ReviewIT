import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import { UserService } from '../../core';
import { UserDetailsDTO } from '../../model/models';


@Component({
  
  selector: 'app-usernav',
  templateUrl: 'usernav.component.html',
  styleUrls: ['usernav.component.css']
})
export class UsernavComponent implements OnInit, OnDestroy {

  user: UserDetailsDTO;
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
