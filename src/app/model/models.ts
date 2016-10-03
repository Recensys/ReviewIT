
export enum DataType {
	String = 0,
	Boolean = 1,
	Radio = 2,
	Checkbox = 3,
	Number = 4,
	Resource = 5
}
export class CriteriaDTO {
	Field: FieldDTO;
	Id: number;
	Value: string;
}
export class FieldDTO {
	DataType: DataType;
	Id: number;
	Name: string;
}
export class ResearcherDetailsDTO {
	FirstName: string;
	Id: number;
}
export class StageConfigDTO {
	Description: string;
	Id: number;
	Name: string;
	RequestedFields: FieldDTO[];
	VisibleFields: FieldDTO[];
}
export class StudyConfigDTO {
	AvailableFields: FieldDTO[];
	Criteria: CriteriaDTO[];
	Description: string;
	Id: number;
	Name: string;
	Researchers: ResearcherDetailsDTO[];
	Stages: StageConfigDTO[];
}
export class StudyDetailsDTO {
	Description: string;
	Id: number;
	Name: string;
}



