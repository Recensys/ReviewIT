import { Field } from "../field";
import { Task } from "./task";

export class StageModel {
  constructor(
      public Id: number,
      public Name: string,
      public Description: string,
      public Fields: Field[],
      public Tasks: Task[]
  ) {  }
}