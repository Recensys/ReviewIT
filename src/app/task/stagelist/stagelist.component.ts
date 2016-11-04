
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'

import { StageDetailsDTO } from "../../model/models";
import { StagelistService } from './stagelist.service';


@Component({
  selector: 'app-task-stagelist',
  templateUrl: 'stagelist.component.html'
})

export class StagelistComponent implements OnInit{

  model: StageDetailsDTO[];
  studyId: number;
  obs: any;

  constructor(
    private api: StagelistService,
    private route: ActivatedRoute,
    ){
  }

  ngOnInit(){
    this.route.params.forEach((params: Params) => {
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
