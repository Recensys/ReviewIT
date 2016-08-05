import { Component } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';
import { APIService } from "../services/api.service";
import { UserService } from '../shared';


@Component({
  moduleId: module.id,
  selector: 'app-login',
  providers: [ APIService, CookieService, UserService ],  
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  errorMessage: string;
  loading: boolean;

  constructor(private _api: APIService, private _cookieService:CookieService, private _userService: UserService){
      this.loading = false;
  }

  login(username, password) {
    this.loading = true;
    this.errorMessage = null;

    this._api.ValidateUser(username, password)
      .subscribe(
        json => {
          this.loading = false;
          console.log(json);
          var token = json['token'];  
          this._cookieService.put('token', token);  
          this._userService.logIn(username);    
        },
        error => {
          this.loading = false;
          this.errorMessage=<any>error
        }
      );

  }

}


