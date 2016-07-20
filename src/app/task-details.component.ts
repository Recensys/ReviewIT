/**
 * Created by jbec on 08/06/2016.
 */

import {ActivatedRoute} from '@angular/router';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {TaskService} from './task.service';
import {TaskModel} from './model/task.model';
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

@Component({
    selector: 'task-details',
    templateUrl: 'app/task-details.component.html',
    directives: [ FieldComponent ],
    providers: [ TaskService, APIService ],
    pipes: [ WherePipe ]
})

export class TaskDetailsComponent implements OnInit, OnDestroy {

    public taskModel: TaskModel;
    public task: Task;
    public fieldData = [];
    public visible: Data[];
    public requested: Data[];
    public resource: Data;
    public url: SafeResourceUrl;
    private sub: any;
    public errorMessage: string;
    public taskState = TaskState;

    constructor(
        private taskservice: TaskService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizationService,
        private _api: APIService
    ) {}

    ngOnInit() {
            this.sub = this.route.params.subscribe(params => {
                let id = +params['id'];

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
                            this.task = this.taskModel.Tasks[0];
                            
                            this.visible = [];
                            this.requested = [];

                            for (var index = 0; index < this.taskModel.Fields.length; index++) {
                                this.fieldData.push({
                                    field: this.taskModel.Fields[index],
                                    data: this.taskModel.Tasks[0].Data[index]
                                });
                            }
                            console.log(this.fieldData[0]);

/*
                            for (var i = 0; i < this.taskModel.Fields.length; i++) {
                                if (this.taskModel.Fields[i].input) {
                                    console.log('+');
                                    this.requested.push(this.taskModel.Tasks[0].Data[i]);                                    
                                }else{
                                    this.visible.push(this.taskModel.Tasks[0].Data[i]);
                                }
                                
                            }

                            console.log(this.requested);
                            console.log(this.visible);
                            */
/*
                    this._api.GetTask(id).subscribe(
                        t => {
                            


                            this.visible = t.data.filter(
                                data => data.field.input === false
                            );

                            this.requested = t.data.filter(
                                data => data.field.input === true
                            );

                            this.resource = t.data.find(
                                data => data.field.type === 'resource'
                            );
                            this.url =
                                this.sanitizer.bypassSecurityTrustResourceUrl(this.resource.Value);

                                
                        },
                        error => this.errorMessage = error
                    );

                    /*

                this.taskservice.getTask(id).then(t => {
                    this.task = t;

                    

                    
                });*/
            });
        
    }


    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

}
