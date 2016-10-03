import { Injectable } from '@angular/core';
import { ReplaySubject }    from 'rxjs/ReplaySubject';
import {CookieService} from 'angular2-cookie/core';
import { Router } from '@angular/router'

import { User } from '../../model'

@Injectable()
export class UserService {

  constructor(private _cookieService: CookieService, private router: Router) { 
    /*let user = this._cookieService.get('user')
    if(user){
      this.user =  JSON.parse(user);
    }*/
    this.user = new User();
    this.user.Name = 'testUSer';
  }

  private loggedInUserSource = new ReplaySubject<User>();

  get login$(){
    return this.loggedInUserSource.asObservable();
  }

  user:User;

  get token(){
    return this._cookieService.get('token');
  }

  get isLoggedIn(){
    //return this.token != null;
    return true;
  }

  logIn(user: User, token: string){
    this.user = user;
    this.loggedInUserSource.next(this.user);
    this._cookieService.put('user', JSON.stringify(this.user));
    this._cookieService.put('token', token);
  }

  logOut(){
    this.user = null;
    this.loggedInUserSource.next(this.user);
    this._cookieService.remove('user');
    this._cookieService.remove('token');
    this.router.navigate(['']);
  }



}
