/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from '../field';

import { DataType } from '../../../model';


export class BooleanField implements Field {

	constructor(data) {
		this.Name = data.Name;
		this.Input = data.Input;
		this.Trueval = data.Trueval;
		this.Falseval = data.Falseval;
	}

	Name: string;
	Input: boolean;
	Trueval: string;
	Falseval: string;
	Type: DataType = DataType.Boolean;
	Options: string[] = ['Yes', 'No'];
	Pick: string;

	get debug() { return JSON.stringify(this); };

	getView() {
		return 'app/field/fields/boolean/boolean.field.html';
	}

}
