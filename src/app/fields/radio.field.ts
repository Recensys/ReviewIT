/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from '../model/field';
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup} from '@angular/common';
import {Component} from '@angular/core';
import {NgFor} from '@angular/common';


export class RadioField implements Field {

  constructor(name: string, input: boolean, options: string[]) {
    this.Name = name;
    this.Input = input;
    this.Options = options;
  }

  Name: string;
  Input: boolean;
  Options: string[];
  model = {};
  Type: string = 'radio';

  getView(): string { return 'app/fields/radio.field.html'; }

}

