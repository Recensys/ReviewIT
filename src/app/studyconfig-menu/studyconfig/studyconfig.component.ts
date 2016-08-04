import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';

import { APIService } from '../../services/api.service'


@Component({
    moduleId: module.id,
    selector: 'app-studyconfig',
    providers: [ APIService ],
    templateUrl: 'studyconfig.component.html',
    styleUrls: ['studyconfig.component.css']
})

export class StudyConfigComponent implements OnInit, OnDestroy {

    @Input() model: any;

     constructor(
        private route: ActivatedRoute
    ) {}


    private sub: any;

    ngOnInit() {
            this.sub = this.route.params.subscribe(params => {
                let id = +params['id'];
                
                //TODO get study
            });
    }


    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    saveDetails(){
        
    }
}