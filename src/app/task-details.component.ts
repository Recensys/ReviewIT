/**
 * Created by jbec on 08/06/2016.
 */

import {ActivatedRoute} from '@angular/router';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {TaskService} from './task.service';
import {Task, TaskState} from './model/task';
import {Data} from './model/data';
import {FieldComponent} from './field.component';
import {WherePipe} from './pipes/where.pipe';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import {APIService} from './services/api.service';
import {StringField} from './fields/string.field';
import {NumberField} from './fields/number.field';
import {ResourceField} from './fields/resource.field';
import {BooleanField} from './fields/boolean.field';
import {RadioField} from './fields/radio.field';
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {CORE_DIRECTIVES} from '@angular/common';
import {StageModel} from './model/stageModel';


@Component({
    selector: 'task-details',
    templateUrl: 'app/task-details.component.html',
    directives: [ FieldComponent, BUTTON_DIRECTIVES, CORE_DIRECTIVES ],
    providers: [ TaskService, APIService ],
    pipes: [ WherePipe ]
})

export class TaskDetailsComponent implements OnInit, OnDestroy {

    public stageModel: StageModel;
    public task: Task;
    public fieldData = [];
    public visible: Data[];
    public requested: Data[];
    public resource: Data;
    public url: SafeResourceUrl;
    private sub: any;
    public errorMessage: string;
    public taskState = TaskState;
    public loading = false;


    constructor(
        private taskservice: TaskService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizationService,
        private _api: APIService
    ) {}

    ngOnInit() {
            this.sub = this.route.params.subscribe(params => {
                let id = +params['id'];
                this.loading = true;

/*
this.taskModel = new TaskModel([
new StringField ('author', false ),
new StringField ('title', false ),
new NumberField ('year', false),
new StringField ('abstract', false ),
new BooleanField ('isGsd?', true, 'yes', 'no' ),
new RadioField ('Quality of study', true, ['Bad', 'Good', 'Great']),
new ResourceField ('pdf', false )
],[
new Task (1, TaskState.New, [
{Id: 1, Value: 'John Doe'},
{Id: 2, Value: "John Doe's big adventure"}, 
{Id: 3, Value: 2005}, 
{Id: 4, Value: 'This paper describes the adventure of John Doe, a masculine and handsome young man. It is also written by John Doe'}, 
{Id: 7, Value: 'hej'},
{Id: 5, Value: false, }, 
{Id: 6, Value: 'http://nexgsd.org/wp-content/uploads/2013/09/BjornEtal2014b.pdf'},
]),
]);
*/

                        this._api.GetTask(id).subscribe(
                            stageModel => {
                                this.stageModel = stageModel;
                                this.task = stageModel.Tasks[0];
                                this.loading = false;
                            }
                            , 
                            error =>{
                                this.loading = false;                                
                                this.errorMessage = error;
                            }
                        );

            });
        
    }


    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

}
