/**
 * Created by jbec on 11/07/2016.
 */
/**
 * Created by jbec on 08/06/2016.
 */
import { ActivatedRoute } from '@angular/router';
import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {TaskService} from './task.service';
import {DraglistDirective} from './directives/draglist.directive';

@Component({
    selector: 'study-config',
    templateUrl: 'app/study-config.component.html',
    directives: [ DraglistDirective ],
    providers: [ TaskService ]
})

export class StudyConfigComponent implements OnInit, OnDestroy {

    @Input()
    private study = {
        title: 'some title',
        description: 'some description'
    };

     constructor(
        private taskservice: TaskService,
        private route: ActivatedRoute
    ) {}


    private sub: any;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
        });
    }


    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
