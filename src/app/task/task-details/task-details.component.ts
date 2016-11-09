
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

import { ReviewTaskListDTO, ReviewTaskDTO, TaskState, FieldDTO, DataType, DataDTO } from '../../model/models';
import { TaskDetailsService } from './task-details.service'

@Component({

    selector: 'app-task-details',
    templateUrl: 'task-details.component.html',
    styleUrls: ['task-details.component.css'],
})

export class TaskDetailsComponent implements OnInit {

    // public task: Task;
    // public fieldData = [];
    // public visible: Data[];
    // public requested: Data[];
    // public resource: Data;

    public taskState = TaskState;
    public url: SafeResourceUrl;
    model: ReviewTaskListDTO;
    selected: ReviewTaskDTO;
    stageId: number;
    obs: any;

    constructor(
        private route: ActivatedRoute,
        private api: TaskDetailsService,
        private ref: ChangeDetectorRef,
    ) {
    }

    ngOnInit() {
        // let stub = new ReviewTaskListDTO();
        // stub.Tasks = new Array();
        // stub.Fields = new Array();
        // let f1 = new FieldDTO()
        // f1.Name = 'Title';
        // f1.DataType = DataType.String;
        // stub.Fields.push(f1);
        // let t1 = new ReviewTaskDTO()
        // let d1 = new DataDTO()
        // d1.Value = 'How to dance the tango and other important life achievements'
        // t1.Data = new Array();
        // t1.Data.push(d1);
        // let t2 = new ReviewTaskDTO()
        // let d2 = new DataDTO()
        // d2.Value = `Answering life's questions with the sciences, or how to waste your life`
        // t2.Data = new Array();
        // t2.Data.push(d2);
        // stub.Tasks.push(t2)
        // stub.Tasks.push(t1)

        this.route.params.forEach((params: Params) => {
            this.stageId = +params['id'];
            this.obs = this.api.getTasks(1, this.stageId);
            this.obs.subscribe(
                dto => {
                    this.model = dto;
                    console.log(this.model);
                    this.selected = this.model.Tasks[0];
                }
            );
        });
    }

    previous() {
        let i = this.model.Tasks.indexOf(this.selected);
        this.selected = null;
        this.ref.detectChanges();
        this.selected = this.model.Tasks[i - 1]
    }

    next() {
        let i = this.model.Tasks.indexOf(this.selected);
        this.selected = null;
        this.ref.detectChanges();
        this.selected = this.model.Tasks[i + 1]
    }


}

