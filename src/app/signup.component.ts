/**
 * Created by mk_ti on 13-07-2016.
 */




import {Component} from '@angular/core';
import {APIService} from "./services/api.service";

@Component({
  selector: 'signup',
  templateUrl: 'app/signup.component.html',
  providers: [APIService]
})

export class SignupComponent{

  errorMessage: string;

  constructor(private _api : APIService){  }

  signin(username, password) {
    console.log(username + " " + password);


    this._api.CreateUser(username, password)
      .subscribe(
        bool => console.log(bool),
        error => this.errorMessage = <any>error
      );
  }

}
