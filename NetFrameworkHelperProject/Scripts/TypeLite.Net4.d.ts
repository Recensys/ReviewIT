
 
 

 


declare module RecensysCoreRepository.DTOs {
	export const enum DataType {
		String = 0,
		Boolean = 1,
		Radio = 2,
		Checkbox = 3,
		Number = 4,
		Resource = 5
	}
	export const enum FieldType {
		Visible = 0,
		Requested = 1
	}
	export const enum ResearcherRole {
		Researcher = 0,
		ResearchManager = 1
	}
	export const enum TaskState {
		Unknown = 0,
		New = 1,
		InProgress = 2,
		Done = 3
	}
	export class CriteriaDTO {
		Exclusions: FieldCriteriaDTO[];
		Inclusions: FieldCriteriaDTO[];
	}
	export class DataDTO {
		Id: number;
		Value: string;
	}
	export class DistributionDTO {
		Dist: UserWorkDTO[];
		Distribution: System.Collections.Generic.KeyValuePair<UserDetailsDTO, number>[];
		IsRandomized: boolean;
		StageId: number;
	}
	export class FieldCriteriaDTO {
		Field: FieldDTO;
		Id: number;
		Operator: string;
		Value: string;
	}
	export class FieldDTO {
		DataType: DataType;
		Id: number;
		Name: string;
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
	export class StageDetailsDTO {
		Description: string;
		Id: number;
		Name: string;
	}
	export class StageFieldsDTO {
		AvailableFields: FieldDTO[];
		RequestedFields: FieldDTO[];
		VisibleFields: FieldDTO[];
	}
	export class StudyDetailsDTO {
		Description: string;
		Id: number;
		Name: string;
	}
	export class StudyMemberDTO {
		FirstName: string;
		Id: number;
		LastName: string;
		Role: ResearcherRole;
	}
	export class TaskFieldDTO {
		DataType: DataType;
		FieldType: FieldType;
		Id: number;
		Name: string;
	}
	export class UserDetailsDTO {
		Email: string;
		FirstName: string;
		Id: number;
		LastName: string;
	}
	export class UserWorkDTO {
		FirstName: string;
		Id: number;
		Range: number[];
	}
}
declare module System.Collections.Generic {
	export class KeyValuePair<TKey, TValue> {
		Key: TKey;
		Value: TValue;
	}
}


