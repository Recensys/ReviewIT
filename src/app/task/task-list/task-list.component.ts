
import { Component, OnInit } from '@angular/core';

import { StageModel } from "../../model/stageModel";
import { FieldComponent } from "../../field";
import { APIService } from '../../services/api.service';


@Component({
  moduleId: module.id,
  selector: 'app-task-list',
  templateUrl: 'task-list.component.html',
  styleUrls: ['task-list.component.css'],
  directives: [ FieldComponent ],
  providers: [ APIService ]
})

export class TasklistComponent implements OnInit{

  stages: StageModel[];
  errorMessage: string;

  constructor(private _api: APIService){
  }

  ngOnInit(){
    this._api.GetStages(0).subscribe(
      stageModels =>{
          console.log(stageModels);
          this.stages = stageModels
      },
      error => this.errorMessage = error
    );
  }
}
