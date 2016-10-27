import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ResearcherDetailsDTO, StudyResearcherDTO } from '../../model';
import { MessageService } from '../../core';
import { StudymembersService } from './studymembers.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs'
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/take';

@Component({

    selector: 'app-studymembers',
    templateUrl: 'studymembers.component.html',
    //styleUrls: ['studymembers.component.css']
})

export class StudymembersComponent implements OnInit {

    @Input() studyId: number;
    model: StudyResearcherDTO[];
    researchers: Observable<ResearcherDetailsDTO[]>;
    term = new FormControl();

    constructor(
        private msg: MessageService,
        private service: StudymembersService
    ) { }

    ngOnInit() {
        this.service.getResearchers(this.studyId).subscribe(
            res => this.model = res,
            error => this.msg.addError(error)
        );

        this.researchers = this.term.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(term => this.service.search(term));
    }


    add(r: ResearcherDetailsDTO) {
        this.model.push({ FirstName: r.FirstName, ResearcherId: r.Id, Role: 0 })
        this.update();
    }

    remove(i: number) {
        this.model.splice(i,1);
        this.update();
    }

    update() {
        this.service.updateResearcher(this.studyId, this.model).subscribe(
            res => this.msg.addInfo("researchers updated"),
            error => this.msg.addError(error)
        )
    }

    




}

