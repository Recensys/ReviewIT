/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from '../model/field.model';

export class NumberField implements Field {

  constructor(data) {
    this.name = data.name;
    this.input = data.input;
  }

  name: string;
  input: boolean;
  min: number;
  max: number;
  type: string = 'number';

  getView() {
    return 'app/fields/number.field.html';
  }
}
