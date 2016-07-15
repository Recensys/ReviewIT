import {TemplateRef} from '@angular/core';
/**
 * Created by jbec on 08/06/2016.
 */

export interface Field {
  name: string;
  input: boolean;
  getView(): string;
  type: string;
}

export interface Data {
  id: number;
  field: Field;
  value: any;
}
