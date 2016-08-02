/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from '../field';

export class StringField implements Field {

  constructor(data) {
    this.Name = data.Name;
    this.Input = data.Input;
  }

  Name: string;
  Input: boolean;
  Type: string =  'string';

  getView() {
    return 'app/fields/string.field.html';
  }

}
