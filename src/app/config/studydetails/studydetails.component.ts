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

    //@Input() studyId: number;
    model: StudyDetailsDTO;

     constructor(
        private route: ActivatedRoute,
        private msg: MessageService,
        private api: StudydetailsService
    ) {}

   ngOnInit() {
		this.route.data.forEach((data: { studydetails: StudyDetailsDTO }) => {
            this.model = data.studydetails;
        });
	}
    
}

