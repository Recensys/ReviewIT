
/**
 * enums
 */
export enum DataType {
	String = 0,
	Boolean = 1,
	Radio = 2,
	Checkbox = 3,
	Number = 4,
	Resource = 5,
	Pdf = 6
}
export enum ResearcherRole {
	Researcher = 0,
	ResearchManager = 1
}
export enum TaskState {
	Unknown = 0,
	New = 1,
	InProgress = 2,
	Done = 3
}
export const enum FieldType {
	Visible = 0,
	Requested = 1
}

/**
 * classes
 */
export class CriteriaDTO {
	Exclusions: FieldCriteriaDTO[];
	Inclusions: FieldCriteriaDTO[];
}
export class FieldCriteriaDTO {
	Field: FieldDTO;
	Id: number;
	Operator: string;
	Value: string;
}
export class DataDTO {
	Id: number;
	Value: string;
}
export class ReviewTaskDTO {
	Data: DataDTO[];
	Id: number;
	TaskState: TaskState;
}
export class ReviewTaskListDTO {
	Fields: TaskFieldDTO[];
	Tasks: ReviewTaskDTO[];
}
export class DistributionDTO {
	Dist: UserWorkDTO[];
	Distribution: KeyValuePair<UserDetailsDTO, number>[];
	IsRandomized: boolean;
	StageId: number;
}
export class UserWorkDTO {
	FirstName: string;
	Id: number;
	Range: number[];
}
export class FieldDTO {
	DataType: DataType;
	Id: number;
	Name: string;
}
export class StageConfigDTO {
	Description: string;
	Id: number;
	Name: string;
	RequestedFields: FieldDTO[];
	VisibleFields: FieldDTO[];
}
export class StageFieldsDTO {
	AvailableFields: FieldDTO[];
	RequestedFields: FieldDTO[];
	VisibleFields: FieldDTO[];
}
export class StageDetailsDTO {
	Description: string;
	Id: number;
	Name: string;
}
export class StudyDetailsDTO {
	Description: string;
	Id: number;
	Name: string;
}
export class TaskFieldDTO {
	DataType: DataType;
	FieldType: FieldType;
	Id: number;
	Name: string;
}
export class StudyMemberDTO {
	FirstName: string;
	Id: number;
	LastName: string;
	Role: ResearcherRole;
}
export class UserDetailsDTO {
	Email: string;
	FirstName: string;
	Id: number;
	LastName: string;
}
export class KeyValuePair<TKey, TValue> {
	Key: TKey;
	Value: TValue;
}





