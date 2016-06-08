/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from "../model/field.model";

export class StringField implements Field {

  constructor(data){
    this.name = data.name;
    this.input = data.input;
  }

  name: string;
  input: boolean;

  getView(){
    return "app/fields/string.field.html"
  }

}
