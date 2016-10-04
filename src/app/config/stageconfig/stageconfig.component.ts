
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';

import { APIService } from '../../services/api.service';
import { Field } from '../../field';
import { MessageService } from '../../core';
import { ReviewStrategyComponent } from './review-strategy/review-strategy.component';
import {StageConfigDTO} from '../../model';

@Component({
	moduleId: module.id,
	selector: 'app-stageconfig',
	templateUrl: 'stageconfig.component.html',
	styleUrls: ['stageconfig.component.css'],
	providers: [ APIService ],
})

export class StageconfigComponent implements OnInit{


	@Input() model: StageConfigDTO;
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
        //this.availableFields.push(...this.model.AvailableFields);
        this.model.VisibleFields = [];
        this.model.RequestedFields = [];
    }



	get diagnostic() { return JSON.stringify(this.model); }
}

