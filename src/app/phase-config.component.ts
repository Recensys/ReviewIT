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
import {FieldComponent} from "./field.component";

@Component({
  selector: 'phase-config',
  templateUrl: 'app/phase-config.component.html',
  directives: [FieldComponent],
  providers: [TaskService]
})

export class PhaseConfigComponent implements OnInit, OnDestroy {


  @Input() id: number;
  public phase: Phase;

  constructor(
    private _taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  private sub: any;

  ngOnInit() {

    console.log(this.id);

    if(isNaN(this.id)) {
      this.sub = this.route.params.subscribe(params => {
        let id = +params['id']; // (+) converts string 'id' to a number
        this._taskService.getPhase(id).then(p => {
          this.phase = p;
        });
      });
    } else {
      this._taskService.getPhase(this.id).then(p => {
        this.phase = p;
      });
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
