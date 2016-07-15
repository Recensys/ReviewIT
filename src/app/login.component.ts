/**
 * Created by mk_ti on 13-07-2016.
 */




import {Component} from '@angular/core';
import {APIService} from "./services/api.service";

@Component({
  selector: 'login',
  templateUrl: 'app/login.component.html',
  providers: [APIService]
})

export class LoginComponenet{

  errorMessage: string;

  constructor(private _api: APIService){

  }

  login(username, password) {
    console.log(username + " " + password);


    this._api.ValidateUser(username, password)
      .subscribe(
        bool => console.log(bool),
        error => this.errorMessage=<any>error
      );

  }

}
