
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

import { ReviewTaskListDTO, ReviewTaskDTO, TaskState, FieldDTO, DataType, DataDTO, FieldType } from '../../model/models';
import { TaskDetailsService } from './task-details.service'
import { SelectedTaskService } from './selected-task.service'


@Component({

    selector: 'app-task-details',
    templateUrl: 'task-details.component.html',
    styleUrls: ['task-details.component.css'],
})

export class TaskDetailsComponent implements OnInit {

    hasPdf: boolean = false;

    public taskState = TaskState;
    public url: SafeResourceUrl;
    model: Array<number>;
    selected: ReviewTaskDTO;
    stageId: number;
    obs: any;

    taskIds: Array<number>;

    constructor(
        private route: ActivatedRoute,
        private api: TaskDetailsService,
        private ref: ChangeDetectorRef,
        private router: Router,
        private selectedService: SelectedTaskService
    ) {
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.stageId = +params['id'];
            this.obs = this.api.getTaskIds(this.stageId);
            this.obs.subscribe(
                dto => {
                    this.model = dto;
                    this.router.navigate([this.model[0]], { relativeTo: this.route });
                }
            );
        });

        this.selectedService.selected$.subscribe(
            sel => this.selected = sel
        );

        this.selectedService.hasPdf$.subscribe(
            bool => this.hasPdf = bool
        );
    }


    previous() {
        this.save(this.selected);
        let i = this.model.indexOf(this.selected.Id);
        this.router.navigate([this.model[i - 1]], { relativeTo: this.route });
    }

    next() {
        this.save(this.selected);
        let i = this.model.indexOf(this.selected.Id);
        this.router.navigate([this.model[i + 1]], { relativeTo: this.route });
    }

    save(dto: ReviewTaskDTO) {
        dto.TaskState = TaskState.Done;
        this.api.UpdateTask(dto).subscribe();
    }

}

