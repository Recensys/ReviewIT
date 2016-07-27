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

    public phases: Phase[] = [
    {
      id: 1,
      name: 'Stage 1',
      description: 'based on the title assess whether the paper is related to global software engineering',
      fields: null,
      tasks: null
    }
  ];
    public selected: Phase;
    public bibtexError: string;
    public loading: boolean = false;
    public disabled: boolean = false;

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

       });
    }


    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onSelect(phase: Phase) { this.selected = phase; }

    loadBibtex(){
        this.bibtexError = "";
    }

    startStudy(){
        this.loading = true;
        this.disabled = true;
    }
}
