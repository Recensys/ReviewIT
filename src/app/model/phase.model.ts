/**
 * Created by jbec on 08/06/2016.
 */

import {Field} from "./field.model";
import {Task} from "./task.model"

export interface Phase {
  id: number,
  name: string,
  description: string,
  tasks: Task[],
  fields: Field[]
}
