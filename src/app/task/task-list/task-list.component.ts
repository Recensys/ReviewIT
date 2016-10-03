
import { Component, OnInit } from '@angular/core';

import { StageModel } from "../../model/stageModel";
import { BooleanField } from "../../field";
import { FieldComponent } from "../../field";
import { APIService } from '../../services/api.service';


@Component({
  moduleId: module.id,
  selector: 'app-task-list',
  templateUrl: 'task-list.component.html',
  styleUrls: ['task-list.component.css'],
})

export class TasklistComponent implements OnInit{

  stages: StageModel[];
  errorMessage: string;

  constructor(private _api: APIService){
  }

  ngOnInit(){
  }
}
