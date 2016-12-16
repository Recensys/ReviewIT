import { Component, OnInit, Input } from '@angular/core';

import { OverviewService } from './overview.service'
import { TaskOverviewDTO } from '../model/models'
import { MessageService } from '../core'

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(
    private api: OverviewService,
    private msg: MessageService
    ) { }

  obs: any;
  model: TaskOverviewDTO;

  @Input() studyId: number

  ngOnInit() {
    this.obs = this.api.get(this.studyId);
    this.obs.subscribe(dto => this.model = dto, error => this.msg.addError(error));
  }

}
