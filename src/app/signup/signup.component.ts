import { Component } from '@angular/core';

import { APIService } from "../services/api.service";
import { MessageService } from '../core';

@Component({
  moduleId: module.id,
  selector: 'app-signup',
  providers: [ APIService ],
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})
export class SignupComponent {

  errorMessage: string;
  loading: boolean;

  constructor(private _api : APIService, private messageService: MessageService){ 
    this.loading=false;  
  }

  signin(username, password) {
    console.log(username + " " + password);
    this.loading = true;
    this.errorMessage = null;

    this._api.CreateUser(username, password)
      .subscribe(
        bool => this.loading = false,
        error => {
          this.loading = false; 
          this.messageService.addError(error);
        }
      );
  }

}


