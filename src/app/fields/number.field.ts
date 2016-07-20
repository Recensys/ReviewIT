/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from '../model/field';

export class NumberField implements Field {

  constructor(name: string, input: boolean) {
    this.Name = name;
    this.Input = input;
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
