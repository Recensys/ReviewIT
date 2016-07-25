/**
 * Created by jbec on 08/06/2016.
 */

import {Component, OnInit} from '@angular/core';
import {StageModel} from "./model/stageModel";
import {FieldComponent} from "./field.component";
import {APIService} from './services/api.service';


@Component({
  selector: 'task-list',
  templateUrl: 'app/task-list.component.html',
  directives: [FieldComponent],
  providers: [APIService]
})

export class TasklistComponent implements OnInit{

  stages: StageModel[];
  errorMessage: string;

  constructor(private _api: APIService){
  }

  ngOnInit(){
    this._api.GetStages(1).subscribe(
      stageModels =>{
          console.log(stageModels);
          this.stages = stageModels
      },
      error => this.errorMessage = error
    );
  }
}
