/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from '../model/field';
import { AlertComponent } from 'ng2-bootstrap/ng2-bootstrap'


export class RadioField implements Field {

  constructor(name: string, input: boolean, options: string[]) {
    this.Name = name;
    this.Input = input;
    this.Options = options;
  }

  Name: string;
  Input: boolean;
  Options: string[];
  Type: string = 'radio';

  getView(): string { return 'app/fields/radio.field.html'; }

}
