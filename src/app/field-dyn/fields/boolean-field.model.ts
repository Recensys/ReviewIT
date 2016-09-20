import {DataType} from '../../model/models';
import {Field} from '../field'

export class BooleanField implements Field{
    Name: string;
	Input: boolean;
	Trueval: string;
	Falseval: string;
	Type: DataType = DataType.Boolean;
	Options: string[] = ['Yes', 'No'];
	Pick: string;
}