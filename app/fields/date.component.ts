import {Component, Input, Output} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {NgForm} from 'angular2/common';
import {Task} from '../task';
import {Field} from '../field';
import {DisabledDirective} from './disabled.directive';
import {CheckedDirective} from './checked.directive';

@Component({
    selector: 'date',
    templateUrl: './app/fields/date.html',
    directives:[NgClass,DisabledDirective,CheckedDirective]
})

export class DateComponent{
    @Input() field:Field;
}
