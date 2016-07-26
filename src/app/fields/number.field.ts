/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from '../model/field';

export class NumberField implements Field {

  constructor(data) {
    this.Name = data.Name;
    this.Input = data.Input;
    console.log("numberField created with name: " + this.Name);
  }

  Name: string;
  Input: boolean;
  Min: number;
  Max: number;
  Type: string = 'number';

  getView() {
    return 'app/fields/number.field.html';
  }
}
