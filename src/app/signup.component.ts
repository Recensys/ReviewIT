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
  loading: boolean;

  constructor(private _api : APIService){ this.loading=false;  }

  signin(username, password) {
    console.log(username + " " + password);
    this.loading = true;
    this.errorMessage = null;

    this._api.CreateUser(username, password)
      .subscribe(
        bool => this.loading = false,
        error => {this.loading = false; this.errorMessage = <any>error;}
      );
  }

}
