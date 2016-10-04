import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'angular2-cookie/core';
import { APIService } from "../services/api.service";
import { UserService } from '../core';
import { User } from '../model';


@Component({
  
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  errorMessage: string;
  loading: boolean;

  constructor(private _api: APIService, private _cookieService:CookieService, private _userService: UserService, private router: Router){
      this.loading = false;
  }

  login(username, password) {
    this.loading = true;
    this.errorMessage = null;

    this._api.ValidateUser(username, password)
      .subscribe(
        json => {
          this.loading = false;
          var token = json['token'];  
          this._userService.logIn(json['user'], token);    
          this.router.navigate(['']);
        },
        error => {
          this.loading = false;
          this.errorMessage=<any>error
        }
      );

  }

}


