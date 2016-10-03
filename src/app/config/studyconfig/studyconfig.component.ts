import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { StudysourcesComponent } from './studysources/studysources.component';
import { ConfigService } from '../config.service';
import { StudyConfigDTO } from '../../model';
import { MessageService } from '../../core';

@Component({
	moduleId: module.id,
	selector: 'app-studyconfig',
	templateUrl: 'studyconfig.component.html',
	styleUrls: ['studyconfig.component.css']
})

export class StudyConfigComponent implements OnInit, OnDestroy {

    @Input() model: StudyConfigDTO;

     constructor(
        private route: ActivatedRoute,
        private configService: ConfigService,
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

    

    deleteStudy() {
        this.configService.deleteStudy(this.model.Id).subscribe(
            res => this.router.navigate(['']),
            error => console.log(error)
        );
    }
}

