/**
 * Created by mk_ti on 13-07-2016.
 */




import {Component} from '@angular/core';
import {APIService} from "./services/api.service";
import {CookieService} from 'angular2-cookie/core';


@Component({
  selector: 'login',
  templateUrl: 'app/login.component.html',
  providers: [APIService, CookieService]
})

export class LoginComponenet{

  errorMessage: string;
  loading: boolean;

  constructor(private _api: APIService, private _cookieService:CookieService){
      this.loading = false;
  }

  login(username, password) {
    console.log(username + " " + password);
    this.loading = true;
    this.errorMessage = null;

    this._api.ValidateUser(username, password)
      .subscribe(
        json => {
          this.loading = false;
          console.log(json);
          var token = json['token'];  
          this._cookieService.put('token', token);      
        },
        error => {
          this.loading = false;
          this.errorMessage=<any>error
        }
      );

  }

}
