/**
 * Created by mk_ti on 13-07-2016.
 */




import {Component} from '@angular/core';
import {TaskService} from "./task.service";
import {Phase} from "./model/phase.model";
import {FieldComponent} from "./field.component";

@Component({
  selector: 'signup',
  templateUrl: 'app/signup.component.html'
})

export class SignupComponent{


  constructor(){  }

  login(username, password) {
    console.log(username + " " + password);
  }

}
