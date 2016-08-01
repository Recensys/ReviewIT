import { Component, OnInit, Input } from '@angular/core';
import {MODAL_DIRECTIVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';
import {APIService} from '../../services/api.service';


@Component({
  moduleId: module.id,
  selector: 'startmodal',
  directives: [MODAL_DIRECTIVES],
  providers: [APIService],
  viewProviders:[BS_VIEW_PROVIDERS],
  templateUrl: 'startmodal.component.html',
  styleUrls: ['startmodal.component.css']
})
export class StartmodalComponent implements OnInit {

  @Input() model: any = {Loading: true, Msg: "The first stage of the study is being initiated"};
  @Input() studyId: number;

  constructor(private _api:APIService) { }

  ngOnInit() {
  }

  startStudy(){
    console.log("start study");
    this._api.startStudy(this.studyId).subscribe(
      msg => this.model.Msg = msg,
      error => this.model.Msg = error
    );
  }



}
