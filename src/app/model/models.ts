
export const enum DataType {
	String = 0,
	Boolean = 1,
	Radio = 2,
	Checkbox = 3,
	Number = 4,
	Resource = 5
}

export class Article {
}

export class Field {
	DataType: DataType;
	Id: number;
	Input: boolean;
	Name: string;
}

export interface Stage {
	Id: number;
	StageDetails: StageDetails;
	StageFields: StageFields;
}

export class StageDetails {
	Description: string;
	Name: string;
}

export interface StageFields {
	Id: number;
	RequestedFields: Field[];
	VisibleFields: Field[];
}

export interface Study {
	AvailableFields: Field[];
	Id: number;
	Researchers: User[];
	Sources: any[];
	Stages: Stage[];
	StudyDetails: StudyDetails;
}

export interface Study2 {
	AvailableFields: Field[];
	Id: number;
	Researchers: User[];
	Sources: any[];
	Stages: Stage[];
	StudyDetails: StudyDetails;
}

export class StudyDetails {
	Description: string;
	Name: string;
}

export class User {
	FirstName: string;
	Id: number;
	LastName: string;
	Password: string;
	PasswordSalt: string;
	Username: string;
}




