/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from '../model/field';

export class StringField implements Field {

  constructor(name: string, input: boolean) {
    this.Name = name;
    this.Input = input;
  }

  Name: string = 'string name'
  Input: boolean;
  Type: string =  'string';

  getView() {
    return 'app/fields/string.field.html';
  }

}
