import {Component, Input, Output} from 'angular2/core';
import {Task} from '../task';
import {Field} from '../field';

@Component({
    selector: 'resource',
    templateUrl: './app/fields/resource.html'
})
export class ResourceComponent{
    @Input() field:Field;
    @Input('task') set setTask(task:Task){
        if(task)
            this.field = task.taskfields.filter(field => field.datafield.datatype == "resource")[0]
    }
}
