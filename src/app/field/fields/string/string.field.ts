/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from '../field';

import { DataType } from '../../../model';


export class StringField implements Field {

  constructor(data) {
    this.Name = data.Name;
    this.Input = data.Input;
  }

  Name: string;
  Input: boolean;
  Type: DataType = DataType.String;

  getView() {
    return 'app/field/fields/string/string.field.html';
  }

}
