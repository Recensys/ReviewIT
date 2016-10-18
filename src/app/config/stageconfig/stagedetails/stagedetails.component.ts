
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';

import { APIService } from '../../../services/api.service';
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

	model: StageDetailsDTO;

	constructor(
        private route: ActivatedRoute,
        private msg: MessageService,
        private api: StagedetailsService,
        private list: Sharedstagelist
	) {    }

	ngOnInit(){
        this.route.parent.params.forEach((params: Params) => {
            let id = +params['id'];
            console.log(this.list.detailsList);
            this.model = this.list.getDetail(id);
        });
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

