import {Field,String,Radio,Checkbox} from './field';
export interface Task {
    id: number,
    fields: Field[] 
}

export interface Phase {
    id: number,
    name: string,
    description: string,
    tasks: Task[],
    header: Field[] 
}
