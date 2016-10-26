import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'

import { MessageService } from '../../../core';
import { StageFieldsDTO } from '../../../model';
import { StagefieldseditorService } from './stagefieldseditor.service'

@Component({
	selector: 'app-stagefieldseditor',
	templateUrl: 'stagefieldseditor.component.html'
})

export class StagefieldseditorComponent implements OnInit {


	model: StageFieldsDTO;
	stageId: number;

	constructor(
		private _msg: MessageService,
		private _api: StagefieldseditorService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.route.parent.params.forEach((params: Params) => {
			let id = +params['id'];
			this.stageId = id;
			this._api.get(this.stageId).subscribe(
				dto => { this.model = dto; console.log(dto);},
				error => this._msg.addError(error)
			)
		})

	}

	save(){
		this._api.save(this.stageId, this.model).subscribe(
			bool => this._msg.addInfo(bool+''),
			error => this._msg.addError(error)
		)
	}
}


