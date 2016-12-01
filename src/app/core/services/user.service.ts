import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';

import { UserDetailsDTO } from '../../model/models';

@Injectable()
export class UserService {

  constructor(private _cookieService: CookieService, private router: Router) { 
    let user = this._cookieService.get('user')
    if(user){
      this.user =  JSON.parse(user);
    }
  }

  private loggedInUserSource = new BehaviorSubject<UserDetailsDTO>(null);

  get login$(){
    return this.loggedInUserSource.asObservable();
  }

  user:UserDetailsDTO;

  get isLoggedIn(){
    return this.user != null;
  }

  logIn(user: UserDetailsDTO){
    this.user = user;
    this.loggedInUserSource.next(this.user);
    this._cookieService.put('user', JSON.stringify(this.user));
  }

  logOut(){
    this.user = null;
    this.loggedInUserSource.next(this.user);
    this._cookieService.remove('user');
    this.router.navigate(['who']);
  }



}
