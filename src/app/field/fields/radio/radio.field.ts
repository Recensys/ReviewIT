/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from '../field';
import {Component} from '@angular/core';
import {NgFor} from '@angular/common';

import { DataType } from '../../../model';


export class RadioField implements Field {

  constructor(name: string, input: boolean) {
    this.Name = name;
    this.Input = input;
  }

  Name: string;
  Input: boolean;
  Options: {value:string}[] = [{value: 'new option'}];
  Pick: string;
  Type: DataType = DataType.Radio;

  getView(): string { return 'app/field/fields/radio/radio.field.html'; }
  get debug() { return JSON.stringify(this); }
}

