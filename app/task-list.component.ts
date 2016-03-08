import {Component}              from 'angular2/core';
import {CheckboxComponent}      from './fields/checkbox.component' 
import {RadioComponent}         from './fields/radio.component' 
import {StringComponent}        from './fields/string.component' 
import {ResourceComponent}      from './fields/resource.component' 
import {BooleanComponent}       from './fields/boolean.component' 
import {Task,Phase}             from './task';
import {Field} from './field';
import {TaskService} from './task.service';

@Component({
    selector: 'task-list',
    templateUrl: 'app/task-list.html',
    directives: [CheckboxComponent, RadioComponent, StringComponent, ResourceComponent, BooleanComponent],
    providers: [TaskService]
})

export class TasklistComponent{ 

    public phases: Phase[]

    constructor(private _taskService: TaskService) {
        this.phases = this._taskService.getPhases()
    }
}
