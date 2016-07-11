/**
 * Created by jbec on 11/07/2016.
 */
/**
 * Created by jbec on 08/06/2016.
 */

import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "./task.service";
import {Phase} from "./model/phase.model";
import {FieldComponent} from "./field.component";
import {RouteSegment, Router} from "@angular/router";

@Component({
  selector: 'phase-config',
  templateUrl: 'app/phase-config.component.html',
  directives: [FieldComponent],
  providers: [TaskService]
})

export class PhaseConfigComponent implements OnInit, OnDestroy {
  public phase: Phase;

  constructor(
    private _taskService: TaskService,
    private route: RouteSegment,
    private router: Router){}

  private sub: any;

  ngOnInit() {
    this.sub = this.route.par
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id']; // (+) converts string 'id' to a number
      this._taskService.getPhase(id).then(p => {
        this.phase = p;
        console.log(p);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
