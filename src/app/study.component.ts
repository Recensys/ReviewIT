/**
 * Created by jbec on 11/07/2016.
 */

import {Component, OnDestroy, OnInit,} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TaskService} from './task.service';
import {Phase} from './model/phase.model';
import {PhaseConfigComponent} from './phase-config.component';
import {StudyConfigComponent} from './study-config.component';

@Component({
    selector: 'study',
    templateUrl: 'app/study.component.html',
    directives: [PhaseConfigComponent, StudyConfigComponent],
    providers: [TaskService]
})

export class StudyComponent implements OnInit, OnDestroy {

    public phases: Phase[];
    public selected: Phase;

    public study = {
        title: 'some title',
        description: 'some description'
    };


    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute
    ) {}

        private sub: any;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];

            //GET STUDY TOO!

            this.taskService.getPhases().then(list => this.phases = list);
        });
    }


    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onSelect(phase: Phase) { this.selected = phase; }
}
