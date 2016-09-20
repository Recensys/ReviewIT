import { Component, OnInit } from '@angular/core';

import { UserService } from '../core';
import {DatafieldeditorComponent} from '../studyconfig-menu/datafieldeditor'
import { DataType} from '../model/models';
import {Data} from '../model/data';
import {Field} from '../field-dyn/field';
import {BooleanField} from '../field-dyn/fields/boolean-field.model';


@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  data: Data;
  field: Field;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.data = {Id: 0, Value: "kkkkkooo"}
    let boolField = new BooleanField();
    boolField.Type = DataType.Boolean;
    boolField.Name = "isGSD?";
    boolField.Options = ["yes", "no"];
    this.field = boolField;
  }

}
