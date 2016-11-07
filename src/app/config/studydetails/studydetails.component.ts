import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnDestroy, OnInit, Input, ViewContainerRef } from '@angular/core';
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
    studyId: number;

    constructor(
        private route: ActivatedRoute,
        private msg: MessageService,
        private api: StudydetailsService,
        private router: Router
    ) {}

   ngOnInit() {
       this.route.parent.params.forEach((params: Params) => {
            this.studyId = +params['id'];
            this.obs = this.api.get(this.studyId);
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
            bool => this.msg.addSuccess('study details updated!'),
            error => this.msg.addError(error)
        );
    }

    delete(){
        this.api.delete(this.studyId).subscribe(
            _ => {
                this.msg.addSuccess('Study deleted!');
                this.router.navigate(['']);
            }
        )
    }
}





