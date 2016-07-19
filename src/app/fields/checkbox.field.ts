/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from '../model/field';

export class CheckboxField implements Field {

  constructor(name: string, input: boolean, options: string[]) {
    this.Name = name;
    this.Input = input;
    this.Options = options;
  }

  Name: string;
  Input: boolean;
  Options: string[];
  Type: string = 'checkbox';

  getView() {
    return 'app/fields/checkbox.field.html';
  }

}
