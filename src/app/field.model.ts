/**
 * Created by jbec on 08/06/2016.
 */
  
export class Field {
  type: string;
  name: string;
  input: boolean;
}

export interface Radio extends Field {
  options: string[]
  selected: string
}

export interface Checkbox extends Field {
  values: any[]
}

export interface String extends Field {
  value: string
}

export interface Resource extends Field {
  url: string
}
