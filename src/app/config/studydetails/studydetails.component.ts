import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { StudyDetailsDTO } from '../../model';
import { MessageService } from '../../core';
import { StudydetailsService } from './studydetails.service'

@Component({
	
	selector: 'app-studydetails',
	templateUrl: 'studydetails.component.html',
	styleUrls: ['studydetails.component.css']
})

export class StudyConfigComponent {

    model: StudyDetailsDTO = new StudyDetailsDTO();
    obs: any;

    constructor(
        private route: ActivatedRoute,
        private msg: MessageService,
        private api: StudydetailsService
    ) {}

   ngOnInit() {
       console.log(this.route);
       this.route.parent.params.forEach((params: Params) => {
            let id = +params['id'];
            console.log(id);
            this.obs = this.api.get(id);
            this.obs.subscribe(
                dto => {
                    this.model = dto;
                    console.log(dto);
                },
                error => this.msg.addError(error)
            );
        });
	}

    save(){
        this.api.update(this.model).subscribe(
            bool => {if(true) this.msg.addError('updated')},
            error => this.msg.addError(error)
        );
    }
    
}

