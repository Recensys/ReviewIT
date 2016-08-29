
import { ActivatedRoute } from '@angular/router';
import { COMMON_DIRECTIVES } from '@angular/common';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';

import { APIService } from '../../services/api.service';
import { Field } from '../../field';
import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';
import { MessageService } from '../../shared';
import { ReviewStrategyComponent } from './review-strategy/review-strategy.component';

@Component({
	moduleId: module.id,
	selector: 'app-stageconfig',
	templateUrl: 'stageconfig.component.html',
	styleUrls: ['stageconfig.component.css'],
	directives: [ DND_DIRECTIVES, COMMON_DIRECTIVES, ReviewStrategyComponent ],
	providers: [ APIService ],
})

export class StageconfigComponent implements OnInit{


	@Input() model: any;
    @Input() availableFields: any = [];

	name: string;
	description: string;
	messages: any = {};



	constructor(
		private _api: APIService,
		private route: ActivatedRoute,
        private msgService: MessageService
	) {    }

	ngOnInit(){
		console.log(this.model);
		console.log(this.availableFields);
	}

	saveStage() {
		this._api.saveStage(this.model).subscribe(
            status => this.msgService.addInfo(status),
            error => this.msgService.addError(error)
        );
	}


    resetDatafields(){
        this.availableFields = [];
        this.availableFields.push(...this.model.AvailableFields);
        this.model.VisibleFields = [];
        this.model.RequestedFields = [];
    }



	get diagnostic() { return JSON.stringify(this.model); }
}

