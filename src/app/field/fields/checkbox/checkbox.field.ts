/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from '../field';

import { DataType } from '../../../model';


export class CheckboxField implements Field {

  constructor(name: string, input: boolean, options: string[]) {
    this.Name = name;
    this.Input = input;
    this.Options = options;
  }

  Name: string;
  Input: boolean;
  Options: string[];
  Type: DataType = DataType.Checkbox;

  getView() {
    return 'app/field/fields/checkbox/checkbox.field.html';
  }

}
