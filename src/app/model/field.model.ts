import {TemplateRef} from "@angular/core";
/**
 * Created by jbec on 08/06/2016.
 */

export interface Field {
  name: string;
  input: boolean;
  getView(): string;
}

export interface Reference {
  id: number,
  data: Data[]
}

export interface Data {
  id: number,
  field: Field,
  value: any
}
