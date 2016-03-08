import {Directive, ElementRef, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Task} from '../task';
import {Field} from '../field';

@Directive({
    selector: '[ngDisabled]'
})

export class DisabledDirective {
    @Input('ngDisabled') set setDisabled(state:boolean){
        this.el.nativeElement.disabled = state; 
    }

    constructor(private el: ElementRef) {}
}
