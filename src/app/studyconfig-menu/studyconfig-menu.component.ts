
import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { Phase } from '../model/phase.model';
import { StageconfigComponent } from './stageconfig/stageconfig.component';
import { StudyConfigComponent } from './studyconfig/studyconfig.component';
import { APIService } from '../services/api.service';
import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';
import { StartmodalComponent } from './startmodal/startmodal.component';
import { MODAL_DIRECTIVES, BS_VIEW_PROVIDERS, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';



@Component({
    moduleId: module.id,
    selector: 'app-studyconfig-menu',
    templateUrl: 'studyconfig-menu.component.html',
    styleUrls: ['studyconfig-menu.component.css'],
    directives: [ StageconfigComponent, StudyConfigComponent, DND_DIRECTIVES, StartmodalComponent, TOOLTIP_DIRECTIVES ],
    providers: [ APIService ],
    viewProviders:[ BS_VIEW_PROVIDERS ]
})

export class StudyconfigMenuComponent implements OnInit, OnDestroy {

    public phases: Phase[] = [
    {
      id: 1,
      name: 'Stage 1',
      description: 'based on the title assess whether the paper is related to global software engineering',
      fields: null,
      tasks: null
    }
  ];

    
    public start = { Loading: false, Show: false, Msg: "Starting Study..."};
    public selected: Phase;
    public bibtexError: string;
    public loading: boolean = false;
    public disabled: boolean = false;

    public model = {Id: 1, Name: "Name of Study", Description: "Study Description", Stages: [{Name: "", Description: ""}]};

    constructor(
        private route: ActivatedRoute,
        private _api: APIService
    ) {
  
    }

        private sub: any;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];

            this._api.GetStages(id).subscribe(
                stages => this.phases,
                error => console.log(error)
            );


            //GET STUDY TOO!

       });
    }


    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onSelect(phase: Phase) { this.selected = phase; }

    loadBibtex(){
        this.bibtexError = "";
    }

    startStudy(id: number){
        
        
        this.start.Show = true;
        this.start.Loading = true;
        this._api.startStudy(id).subscribe(
            msg => {
                this.start.Msg = msg;
                this.start.Loading = false;                
            },
            error => {
                this.start.Msg = error;
                this.start.Loading = false;
            }
        );
    }

    addNewStage(){
        this.model.Stages.push({Name: "", Description: ""});
    }

    removeStage(index: number){
        if (index > -1) {
            this.model.Stages.splice(index, 1);
        }
    }

    cloneStage(stage){
        this.model.Stages.push(JSON.parse(JSON.stringify(stage)));
    }
}
