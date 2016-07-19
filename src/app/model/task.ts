
import { Field } from "./field";
import { Data } from "./data";

export enum TaskState {
  New, InProgress, Submitted
}

export class Task {
  constructor(
    public Id: number,
    public State: TaskState,    
    public Data: Data[]
  ) {  }
}