import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'

import { TaskContentService } from './task-content.service'
import { ReviewTaskListDTO, ReviewTaskDTO, TaskState, FieldDTO, DataType, DataDTO, FieldType } from '../../../model/models';
import { SelectedTaskService } from '../selected-task.service'

@Component({
  selector: 'app-task-content',
  templateUrl: './task-content.component.html',
  styleUrls: ['./task-content.component.css']
})
export class TaskContentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private api: TaskContentService,
    private selectedService: SelectedTaskService
  ) { }

  taskState = TaskState;
  obs: any;
  taskId: number;
  model: ReviewTaskListDTO;

  // handle pdf
  public resourceField: FieldDTO;
  public resourceData: DataDTO;

  selected: ReviewTaskDTO;

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.taskId = +params['id'];
      this.obs = this.api.getTask(this.taskId);
      this.obs.subscribe(
        dto => {
          this.checkForPdf(dto);
          this.model = dto;
          this.selected = this.model.Tasks[0];
          this.selectedService.setSelected(this.selected)
        }
      );
    });
  }

  checkForPdf(dto: ReviewTaskListDTO) {
    if (dto == null || dto.Fields == null || dto.Tasks == null || dto.Tasks[0] == null) return;
    var index = 0;
    for (let el of dto.Fields) {
      if (el.DataType == 6 && el.FieldType == FieldType.Visible) {
        this.resourceField = dto.Fields.splice(index, 1)[0];
        this.resourceData = dto.Tasks[0].Data.splice(index, 1)[0];
        this.selectedService.setHasPdf(true);
        break;
      };
      index++;
    };
  }


}
