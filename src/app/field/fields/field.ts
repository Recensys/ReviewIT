import {TemplateRef} from '@angular/core';

import { DataType } from '../../model';

export interface Field {
  Name: string;
  Input: boolean;
  getView(): string;  
  Type: DataType;
}