/**
 * Created by mk_ti on 13-07-2016.
 */




import {Component} from '@angular/core';
import {SignupinService} from "./services/api.service";

@Component({
  selector: 'login',
  templateUrl: 'app/login.component.html',
  providers: [SignupinService]
})

export class LoginComponenet{

  errorMessage: string;

  constructor(private _signupinService: SignupinService){

  }

  login(username, password) {
    console.log(username + " " + password);


    this._signupinService.Validate(username, password)
      .subscribe(
        bool => console.log(bool),
        error => this.errorMessage=<any>error
      );

  }

}
