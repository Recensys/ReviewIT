
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'

import { MessageService, UserService } from '../../core'
import { StageModel } from "../../model/stageModel";
import { BooleanField } from "../../field";
import { FieldComponent } from "../../field";
import { TaskListService } from './task-list.service';
import { ReviewTaskListDTO, TaskState, ReviewTaskDTO } from '../../model/models'

@Component({
  
  selector: 'app-task-list',
  templateUrl: 'task-list.component.html',
  styleUrls: ['task-list.component.css'],
})

export class TasklistComponent implements OnInit{

  model: ReviewTaskListDTO;
  errorMessage: string;
  obs: any;
  public state: TaskState;

  constructor(
    private api: TaskListService,
    private route: ActivatedRoute,
    private msg: MessageService,
    private us: UserService
  ){}

  ngOnInit(){
    this.route.parent.params.forEach((params: Params) => {
            let id = +params['id'];
            this.obs = this.api.getTasks(/*this.us.user.Id*/ 1, id);
            this.obs.subscribe(
                dtos => {
                    this.model = dtos;
                    console.log(dtos);
                }
            );
        });
  }
}
