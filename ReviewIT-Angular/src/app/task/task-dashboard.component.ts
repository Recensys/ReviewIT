
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'

import { ReviewTaskListDTO } from "../model/models";
import { TaskDashboardService } from './task-dashboard.service';


@Component({
  selector: 'app-task-dashboard',
  templateUrl: 'task-dashboard.component.html'
})

export class TaskDashboard implements OnInit{

  model: ReviewTaskListDTO;
  stageId: number;
  obs: any;

  constructor(
    private api: TaskDashboardService,
    private route: ActivatedRoute,
    ){
  }

  ngOnInit(){
    this.route.params.forEach((params: Params) => {
            this.stageId = +params['id'];
            this.obs = this.api.getTasks(1, this.stageId);
            this.obs.subscribe(
                dtos => {
                    this.model = dtos;
                }
            );
        });
  }
}
