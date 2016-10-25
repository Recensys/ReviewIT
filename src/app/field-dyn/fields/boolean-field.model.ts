import {DataType, FieldDTO} from '../../model/models';
import {Field} from '../field'

export class BooleanField implements FieldDTO{
	Id: number;
    Name: string;
	Input: boolean;
	Trueval: string;
	Falseval: string;
	DataType: DataType = DataType.Boolean;
	Options: string[] = ['Yes', 'No'];
	Pick: string;
}