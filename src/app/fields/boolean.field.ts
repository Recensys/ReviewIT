/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from '../model/field.model';

export class BooleanField implements Field {

  constructor(data) {
    this.name = data.name;
    this.input = data.input;
    this.trueval = data.trueval;
    this.falseval = data.falseval;
  }

  name: string;
  input: boolean;
  trueval: string;
  falseval: string;
  type: string = 'boolean';

  getView() {
    return 'app/fields/boolean.field.html';
  }

}
