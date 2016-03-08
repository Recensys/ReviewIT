import {Directive, ElementRef, Input} from 'angular2/core';
import {Task} from '../task';
import {Field} from '../field';

@Directive({
    selector: '[ngChecked]'
})

export class CheckedDirective {
    @Input('ngChecked') set setDisabled(state:boolean){
        this.el.nativeElement.checked = state; 
    }

    constructor(private el: ElementRef) {}
}
