import {TemplateRef} from '@angular/core';

export interface Field {
  Name: string;
  Input: boolean;
  getView(): string;  
  Type: string;
}