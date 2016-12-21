
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';

import { MessageService } from '../../../core';
import { StageDetailsDTO } from '../../../model';
import { StagedetailsService } from './stagedetails.service'
import { Sharedstagelist } from '../../stagelist/sharedstagelist.service'

@Component({
	selector: 'app-stagedetails',
	templateUrl: 'stagedetails.component.html',
	styleUrls: ['stagedetails.component.css'],
})

export class StagedetailsComponent implements OnInit{

	model: StageDetailsDTO = new StageDetailsDTO();

	constructor(
        private route: ActivatedRoute,
        private msg: MessageService,
        private api: StagedetailsService,
        private list: Sharedstagelist
	) {    }

	ngOnInit(){
        this.route.parent.params.forEach((params: Params) => {
            let id = +params['id'];
            this.model = this.list.getDetail(id);
        });
	}

    save(){
        this.api.save(this.model).subscribe(
            bool => this.msg.addSuccess('stage details updated!'),
            error => this.msg.addError(error)
        );
    }

	get diagnostic() { return JSON.stringify(this.model); }
}

