/**
 * Created by jbec on 08/06/2016.
 */

import {Field, Data} from "./field.model";

export interface Task {
  id: number,
  state: number,
  data: Data[],
}
