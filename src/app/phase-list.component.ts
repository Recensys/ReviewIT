/**
 * Created by jbec on 11/07/2016.
 */

import {Component} from '@angular/core';
import {TaskService} from './task.service';
import {Phase} from './model/phase.model';
import {PhaseConfigComponent} from './phase-config.component';
import {StudyConfigComponent} from './study-config.component';

@Component({
    selector: 'phase-config',
    templateUrl: 'app/phase-list.component.html',
    directives: [PhaseConfigComponent, StudyConfigComponent],
    providers: [TaskService]
})

export class PhaseListComponent {

    public phases: Phase[];
    public selected: Phase;


    constructor(private taskService: TaskService) {
        this.taskService.getPhases().then(list => this.phases = list);
    }

    onSelect(phase: Phase) { this.selected = phase; }
}
