
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'

import { MessageService, UserService } from '../../core'
import { TaskListService } from './task-list.service';
import { ReviewTaskListDTO, TaskState, ReviewTaskDTO } from '../../model/models'

@Component({
  
  selector: 'app-task-list',
  templateUrl: 'task-list.component.html',
  styleUrls: ['task-list.component.css'],
})

export class TasklistComponent implements OnInit{

  public state: TaskState;

  @Input() model: ReviewTaskListDTO;

  constructor(
    private api: TaskListService,
    private route: ActivatedRoute,
    private msg: MessageService,
    private us: UserService
  ){}

  ngOnInit(){
    
  }
}
