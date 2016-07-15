/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from '../model/field.model';

export class CheckboxField implements Field {

  constructor(data) {
    this.name = data.name;
    this.input = data.input;
    this.options = data.options;
  }

  name: string;
  input: boolean;
  options: string[];
  type: string = 'checkbox';

  getView() {
    return 'app/fields/checkbox.field.html';
  }

}
