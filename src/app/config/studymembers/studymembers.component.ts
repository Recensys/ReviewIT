import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { UserDetailsDTO } from '../../model';
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

    studyId: number;
    model: UserDetailsDTO[];
    researchers: Observable<UserDetailsDTO[]>;
    term = new FormControl();
    obs: any;

    constructor(
        private msg: MessageService,
        private api: StudymembersService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.parent.params.forEach((params: Params) => {
            let id = +params['id'];
            this.studyId = id;
            this.obs = this.api.getResearchers(id)
            this.obs.subscribe(
                res => this.model = res,
                error => this.msg.addError(error)
            );

            this.researchers = this.term.valueChanges
                .debounceTime(400)
                .distinctUntilChanged()
                .switchMap(term => this.api.searchGlobalUsers(term));
        });
    }

    save(){
        this.api.save(this.studyId, this.model).subscribe(
            bool => this.msg.addInfo(bool+''),
            error => this.msg.addError(error)
        );
    }


    add(r: UserDetailsDTO) {
        this.model.push(r)
        //this.update();
    }

    remove(i: number) {
        this.model.splice(i, 1);
        //this.update();
    }

    // update() {
    //     this.api.updateResearcher(this.studyId, this.model).subscribe(
    //         res => this.msg.addInfo("researchers updated"),
    //         error => this.msg.addError(error)
    //     )
    // }

}

