
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'

import { StageDetailsDTO } from "../../model/models";
import { StagelistService } from './stagelist.service';
import { environment } from '../../../environments/environment'


@Component({
  selector: 'app-task-stagelist',
  templateUrl: 'stagelist.component.html',
  styleUrls: ['stagelist.component.css']
})

export class StagelistComponent implements OnInit{

  model: StageDetailsDTO[];
  studyId: number;
  obs: any;

  constructor(
    private api: StagelistService,
    private route: ActivatedRoute,
    private router: Router
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

  download(){
    window.location.href = this.bibtexLink;
  }

  get bibtexLink(){
    return `${environment.api}study/${this.studyId}/bib`;
  }

}
