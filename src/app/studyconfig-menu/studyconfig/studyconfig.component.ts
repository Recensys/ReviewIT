import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { StudysourcesComponent } from './studysources/studysources.component';
import { APIService } from '../../services';
import { StudyDetails } from '../../model';
import { MessageService } from '../../core';

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
        private route: ActivatedRoute,
        private _api: APIService,
        private router: Router,
        private messageService: MessageService
    ) {}

    private id: number;
    private sub: any;

    ngOnInit() {
            this.sub = this.route.params.subscribe(params => {
                this.id = +params['id'];
            });

    }


    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    saveDetails() {
        this._api.saveStudyDetails(this.id, {Name: this.model.Name, Description: this.model.Description}).subscribe(
            status => console.log(),
            error => console.log(error)
        );
    }

    deleteStudy() {
        this._api.deleteStudy(this.id).subscribe(
            res => this.router.navigate(['']),
            error => console.log(error)
        );
    }
}

