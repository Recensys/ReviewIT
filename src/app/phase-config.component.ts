/**
 * Created by jbec on 11/07/2016.
 */
/**
 * Created by jbec on 08/06/2016.
 */
import { ActivatedRoute, Router } from '@angular/router';
import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {TaskService} from "./task.service";
import {Phase} from "./model/phase.model";
import {DraglistDirective} from "./directives/draglist.directive";

@Component({
  selector: 'phase-config',
  templateUrl: 'app/phase-config.component.html',
  directives: [ DraglistDirective ],
  providers: [ TaskService ]
})

export class PhaseConfigComponent implements OnInit, OnDestroy {


  @Input() private phase: Phase;

  private available:any[] = [
    "Abstract",
    "Year",
    "DOI",
    "PDF"
  ];

  private visible:string[] = [
    "Title",
    "Author"
  ]
  private requested:string[] = [
    "Is GSD?"
  ]




  constructor(
    private _taskService: TaskService,
    private route: ActivatedRoute
  ){}

  private sub: any;

  ngOnInit() {
    if (this.phase == undefined) {
      this.sub = this.route.params.subscribe(params => {
        let id = +params['id']; // (+) converts string 'id' to a number
        this._taskService.getPhase(id).then(p => {
          this.phase = p;
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
