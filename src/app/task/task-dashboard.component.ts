
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'

import { StageDetailsDTO } from "../model/models";
import { TaskDashboardService } from './task-dashboard.service';


@Component({
  selector: 'app-task-dashboard',
  templateUrl: 'task-dashboard.component.html'
})

export class TaskDashboard implements OnInit{

  model: StageDetailsDTO[];
  studyId: number;
  obs: any;

  constructor(
    private api: TaskDashboardService,
    private route: ActivatedRoute,
    ){
  }

  ngOnInit(){
    this.route.parent.params.forEach((params: Params) => {
            let id = +params['id'];
            this.studyId = id;
            this.obs = this.api.get(id);
            this.obs.subscribe(
                dtos => {
                    this.model = dtos;
                }
            );
        });
  }
}
