import { Component, OnInit, Input } from '@angular/core';

import { MODAL_DIRECTIVES, BS_VIEW_PROVIDERS } from 'ng2-bootstrap/ng2-bootstrap';
import { APIService } from '../../services/api.service';


@Component({
  moduleId: module.id,
  selector: 'startmodal',
  directives: [ MODAL_DIRECTIVES ],
  providers: [ APIService ],
  viewProviders:[ BS_VIEW_PROVIDERS ],
  templateUrl: 'startmodal.component.html',
  styleUrls: ['startmodal.component.css']
})
export class StartmodalComponent implements OnInit {

  @Input() model: any = {Loading: true, Msg: ""};
  @Input() studyId: number;
  private loading: boolean = false;

  constructor(private _api:APIService) { }

  ngOnInit() {}

  startStudy(){
    this.model.Msg = "The first stage of the study is being initiated";    
    this.loading = true;
    this._api.startStudy(0).subscribe(
      msg => {
        console.log(msg);
        this.loading = false;
        this.model.Msg = `The first stage has been initiated with ${msg.NrOfCreatedTasks} tasks`;
      },
      error => {
        this.loading = false;
        this.model.Msg = error
      }
    );
  }



}
