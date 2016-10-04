
import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { Phase } from '../model/phase.model';
import { StageconfigComponent } from './stageconfig/stageconfig.component';
import { StudyConfigComponent } from './studyconfig/studyconfig.component';
import { APIService } from '../services/api.service';
//import { MODAL_DIRECTIVES, BS_VIEW_PROVIDERS, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { StudyConfigDTO, StageConfigDTO, StudyDetailsDTO } from '../model/models';
import { MessageService } from '../core';
import {ConfigService} from './config.service';

@Component({
    moduleId: module.id,
    selector: 'app-studyconfig-menu',
    templateUrl: 'studyconfig-menu.component.html',
    styleUrls: ['studyconfig-menu.component.css'],
    providers: [ APIService ],
    //viewProviders:[ BS_VIEW_PROVIDERS ]
})

export class StudyconfigMenuComponent implements OnInit, OnDestroy {


    
    public start = { Loading: false, Show: false, Msg: "Starting Study..."};
    
    public bibtexError: string;
    public loading: boolean = false;
    public disabled: boolean = false;

    public model: StudyConfigDTO = null;
    public selected: StageConfigDTO = null;

    constructor(
        private route: ActivatedRoute,
        private configService: ConfigService,
        private _msg: MessageService
    ) { 
    }

    private sub: any;
    private id: number;

    ngOnInit() {
        // subscribe to id
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];

            // get model
            this.configService.get(id).subscribe(
                    study => {
                        this.model = study;
                        },
                    error => console.log(error)
            );
        } );


    }


    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onSelect(stage) { this.selected = stage; }

    loadBibtex(){
        this.bibtexError = "";
    }

    startStudy(id: number){
        
        
        // this.start.Show = true;
        // this.start.Loading = true;
        // this._api.startStudy(id).subscribe(
        //     msg => {
        //         this.start.Msg = msg;
        //         this.start.Loading = false;                
        //     },
        //     error => {
        //         this.start.Msg = error;
        //         this.start.Loading = false;
        //     }
        // );
    }

    addNewStage(){
        this.model.Stages.push({Id: undefined, Name: '', Description: '',  VisibleFields: [], RequestedFields: []});
    }

    removeStage(index: number){
        if (index > -1) {
            this.model.Stages.splice(index, 1);
        }
    }

    cloneStage(stage){
        this.model.Stages.push(JSON.parse(JSON.stringify(stage)));
    }

    saveStudy(study){
        this.configService.updateConfig(study).subscribe(
            res => {
                console.log(res);
                if(res) this._msg.addInfo("saved!");
                if(!res) this._msg.addError("not saved!");
            },
            error => this._msg.addError(error)
        );
    }

    
}
