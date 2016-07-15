/**
 * Created by jbec on 08/06/2016.
 */

import {ActivatedRoute} from '@angular/router';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {TaskService} from './task.service';
import {Task} from './model/task.model';
import {Data} from './model/field.model';
import {FieldComponent} from './field.component';
import {WherePipe} from './pipes/where.pipe';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

@Component({
    selector: 'task-details',
    templateUrl: 'app/task-details.component.html',
    directives: [ FieldComponent ],
    providers: [ TaskService ],
    pipes: [ WherePipe ]
})

export class TaskDetailsComponent implements OnInit, OnDestroy {

    public task: Task;
    public visible: Data[];
    public requested: Data[];
    public resource: Data;
    public url: SafeResourceUrl;


    private sub: any;

    constructor(
        private taskservice: TaskService,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizationService
    ) {}

    ngOnInit() {
        if (this.task == undefined) {
            this.sub = this.route.params.subscribe(params => {
                let id = +params['id'];
                this.taskservice.getTask(id).then(t => {
                    this.task = t;

                    this.visible = t.data.filter(
                        data => data.field.input === false
                        // && data.field.type !== 'resource'
                    );

                    this.requested = t.data.filter(
                        data => data.field.input === true
                    );

                    this.resource = t.data.find(
                        data => data.field.type === 'resource'
                    );

                    this.url =
                        this.sanitizer.bypassSecurityTrustResourceUrl(this.resource.value);
                });
            });
        }
    }


    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

}
