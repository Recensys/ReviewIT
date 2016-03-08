import {Directive, ElementRef, Input} from 'angular2/core';
import {Task} from './task';
import {Field,Radio,Checkbox,Kvp,String} from './field';

@Directive({
    selector: '[task-field]'
})

export class TaskFieldDirective {
    private _field:Field;
    @Input('task-field') set setField(field:Field){
        this._field = field;
        this.el.nativeElement.innerHTML = this._field.value; 
    }

    constructor(private el: ElementRef) { }
}
