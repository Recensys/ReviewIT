import {Component, OnInit}      from 'angular2/core';
import {RouteParams}            from 'angular2/router';
import {CheckboxComponent}      from './fields/checkbox.component' 
import {RadioComponent}         from './fields/radio.component' 
import {StringComponent}        from './fields/string.component' 
import {ResourceComponent}      from './fields/resource.component' 
import {BooleanComponent}      from './fields/boolean.component' 
import {Task}                   from './task';
import {Field}                  from './field';
import {TaskService}            from './task.service';
import {FilterPipe}             from './filter';
import {NgClass}                from 'angular2/common';

@Component({
    selector: 'task-details',
    templateUrl: 'app/task-details.html',
    directives: [CheckboxComponent, RadioComponent, StringComponent, ResourceComponent, BooleanComponent, NgClass],
    providers: [TaskService],
    pipes: [FilterPipe]
})

export class TaskdetailsComponent implements OnInit { 

    public task: Task
    public visibleFields: Field[]
    public requestedFields: Field[]
    public resource: Field

    constructor( private _taskService: TaskService, private _routeParams: RouteParams ){}

    ngOnInit() {
        let id = +this._routeParams.get('id');
        this._taskService.getTask(id).then(task => 
           {
               this.task = task
               this.visibleFields = task.taskfields.filter(item => item.datafield.input == false && item.datafield.datatype != "resource")
               this.requestedFields = task.taskfields.filter(item => item.datafield.input == true)
               this.resource = task.taskfields.filter(item => item.datafield.datatype == "resource")[0]
           }
        );
    }
}
