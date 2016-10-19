import { Component, OnDestroy, OnInit, Input } from '@angular/core';

import { MessageService } from '../../../core';
import { StageFieldsDTO } from '../../../model';
import { StagefieldseditorService } from './stagefieldseditor.service'

@Component({
	selector: 'app-stagefieldseditor',
	templateUrl: 'stagefieldseditor.component.html'
})

export class StagefieldseditorComponent implements OnInit{


	model: StageFieldsDTO = new StageFieldsDTO();
    @Input() stageId: number;

	constructor(
        private _msg: MessageService,
        private _api: StagefieldseditorService
	) {    }

	ngOnInit(){
        // this._api.get(this.stageId).subscribe(
        //     dto => {this.model = dto; console.log(dto)},
        //     error => this._msg.addError(error)
        // )
	}

	get diagnostic() { return JSON.stringify(this.model); }
}

