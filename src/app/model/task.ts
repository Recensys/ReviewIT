
import { Field } from "../field";
import { Data } from "./data";

export enum TaskState {
  New, InProgress, Submitted
}

export class Task {
  constructor(data) 
  {  
    this.Id = data.Id,
    this.State = data.TaskState,
    this.Data = data.Data
  }

  public Id: number;
  public State: TaskState;
  public Data: Data[]
}