
import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { MessageService } from '../../core';
import { StageDetailsDTO } from '../../model/models'
import { StagelistService } from './stagelist.service'
import { Sharedstagelist } from './sharedstagelist.service'

@Component({

    selector: 'app-stageconfig',
    templateUrl: 'stagelist.component.html',
    styleUrls: ['stagelist.component.css'],
})

export class StagelistComponent {

    model: StageDetailsDTO[];
    selected: StageDetailsDTO;
    menu: number;
    obs: any;
    studyId: number;

    constructor(
        private route: ActivatedRoute,
        private msg: MessageService,
        private api: StagelistService,
        private stagelist: Sharedstagelist
    ) { }

    ngOnInit() {
        this.route.parent.params.forEach((params: Params) => {
            let id = +params['id'];
            this.studyId = id;
            this.obs = this.api.get(id);
            this.obs.subscribe(
                dtos => {
                    this.model = dtos;
                    this.stagelist.details = dtos;
                },
                error => this.msg.addError(error)
            );
        });
    }

    select(detail) {
        console.log(detail);
        this.selected = detail;
    }

    add() {
        let dto = new StageDetailsDTO();
        this.api.create(this.studyId, dto).subscribe(
            id => {
                dto.Id = id,
                    this.model.push(dto);
            },
            error => this.msg.addError(error)
        )
            
    }
}
