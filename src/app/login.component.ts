/**
 * Created by mk_ti on 13-07-2016.
 */




import {Component} from '@angular/core';
import {TaskService} from "./task.service";
import {Phase} from "./model/phase.model";
import {FieldComponent} from "./field.component";

@Component({
  selector: 'login',
  templateUrl: 'app/login.component.html'
})

export class LoginComponenet{


  constructor(){  }

  login(username, password) {
    console.log(username + " " + password);
  }
  
}
