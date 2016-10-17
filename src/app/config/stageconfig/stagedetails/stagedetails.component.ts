
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';

import { APIService } from '../../../services/api.service';
import { MessageService } from '../../../core';
import { StageDetailsDTO } from '../../../model';
import { StagedetailsService } from './stagedetails.service'

@Component({
	selector: 'app-stagedetails',
	templateUrl: 'stagedetails.component.html',
	styleUrls: ['stagedetails.component.css'],
})

export class StagedetailsComponent implements OnInit{

	@Input() model: StageDetailsDTO;

	constructor(
        private msg: MessageService,
        private api: StagedetailsService
	) {    }

	ngOnInit(){
	}

    save(){
        this.api.save(this.model).subscribe(
            bool => {
                if(bool) this.msg.addInfo('stage saved');
                else this.msg.addWarning('the stage was not saved');
            },
            error => this.msg.addError(error)
        );
    }

	get diagnostic() { return JSON.stringify(this.model); }
}

