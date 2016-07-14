/**
 * Created by mk_ti on 13-07-2016.
 */




import {Component} from '@angular/core';
import {SignupinService} from "./services/api.service";

@Component({
  selector: 'signup',
  templateUrl: 'app/signup.component.html',
  providers: [SignupinService]
})

export class SignupComponent{

  errorMessage: string;

  constructor(private _signupinService : SignupinService){  }

  signin(username, password) {
    console.log(username + " " + password);


    this._signupinService.Create(username, password)
      .subscribe(
        bool => console.log(bool),
        error => this.errorMessage = <any>error
      );
  }

}
