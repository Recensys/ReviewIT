import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TaskService} from '../../task.service';
import {Phase} from '../../model/phase.model';
import {PhaseConfigComponent} from '../../phase-config.component';
import {StudyConfigComponent} from '../../study-config.component';
import {APIService} from '../../services/api.service';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {StartmodalComponent} from '../../components/startmodal/';
import {MODAL_DIRECTIVES, BS_VIEW_PROVIDERS} from 'ng2-bootstrap/ng2-bootstrap';



@Component({
    selector: 'app-studyconfig',
    directives: [PhaseConfigComponent, StudyConfigComponent, DND_DIRECTIVES, StartmodalComponent],
    providers: [TaskService, APIService],
    viewProviders:[BS_VIEW_PROVIDERS],
    templateUrl: 'studyconfig.component.html',
    styleUrls: ['studyconfig.component.css']
})

export class StudyconfigComponent implements OnInit, OnDestroy {

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
        private taskService: TaskService,
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

