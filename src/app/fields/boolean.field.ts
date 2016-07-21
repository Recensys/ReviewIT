/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from '../model/field';

export class BooleanField implements Field {

  constructor(name: string, input: boolean, trueval: string, falseval: string) {
    this.Name = name;
    this.Input = input;
    this.Trueval = trueval;
    this.Falseval = falseval;
  }

  Name: string;
  Input: boolean;
  Trueval: string;
  Falseval: string;
  Type: string = 'boolean';
  Options: string[] = ["Yes", "No"]
  Pick: string;

  getView() {
    return 'app/fields/boolean.field.html';
  }
  get debug() { return JSON.stringify(this); }

}
