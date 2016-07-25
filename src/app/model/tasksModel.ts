import { Field } from "./field";
import { Task } from "./task";

export class TasksModel {
  constructor(
    public Fields: Field[],
    public Tasks: Task[]
  ) {  }
}