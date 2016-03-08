import {Component, Input, Output} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {NgForm} from 'angular2/common';
import {Task} from '../task';
import {Field} from '../field';
import {DisabledDirective} from './disabled.directive';
import {CheckedDirective} from './checked.directive';

@Component({
    selector: 'string',
    templateUrl: './app/fields/string.html'
    directives:[NgClass,DisabledDirective,CheckedDirective]
})

export class StringComponent{
    @Input() field:Field;
}
