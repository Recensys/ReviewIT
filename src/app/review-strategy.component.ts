import {Component, OnInit} from '@angular/core';
import {APIService} from './services/api.service';
import {COMMON_DIRECTIVES} from '@angular/common';
import {Ng2SliderComponent} from './directives/ng2-slider.component';


@Component({
    selector: 'review-strategy',
    providers: [],
    directives: [COMMON_DIRECTIVES, Ng2SliderComponent],
    template: `
        <div class="card">
    <div class="card-header">
      Review strategy
    </div>
    <div class="card-block">
      

      <!--<input type="range" min="10" max="1000" step="10" />-->

      <div class="container-fluid">

        <div class="form-group row">
          <div class="dropdown col-sm-10">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Presets
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu1">
                <a class="dropdown-item" *ngFor="let preset of presets">{{preset}}</a>
            </div>
            </div>
          <p class="col-sm-10  text-muted">
            This is a preset for how to distribute tasks between researchers. You can change to a custom configuration by draging the bars below.
          </p>
        </div>

        


        <dl class="dl-horizontal">
          <hr/>
          <dt class="col-sm-2 text-truncate">All Articles</dt>
          <!--<dd class="col-sm-10"><progress class="progress" value="100" max="100">0%</progress></dd>-->
          <dd class="col-sm-10">
            <div class="meter">
              <span class="selected" style="width: 100%; margin-left: 0">100%</span>
            </div>
          </dd>

          <div *ngFor="let researcher of researchers">
            <dt class="col-sm-2 text-truncate">{{researcher.Name}}</dt>
            <div class="col-sm-10">
              <ng2-slider #range min="0" max="100" inputs="false" [normalHandlerStyle]="{ 'background-color': 'blue'}" startValue="{{researcher.start}}" endValue="{{researcher.end}}">
              </ng2-slider>
            </div>
          </div>

          

        <dt class="col-sm-12 text-truncate">
          <span class="label label-primary"> Add researcher
            <!--<i class="fa fa-plus" aria-hidden="true"></i>-->
          </span>
        </dt>
        <!--<dd class="col-sm-10"></dd>-->
        </dl>
      </div>
    </div>
    <div class="card-footer">
      <a href="#" class="btn btn-primary">Save</a>
    </div>
  </div>
    `
})

export class ReviewStrategyComponent{

    presets: Array<any> = [
        "Equal Distribution",
        "Full Overlap"
    ]
    researchers: Array<any> = [
        {Name: "Mathias", Percentage: 50},
        {Name: "Jacob", Percentage: 50}
    ]

    constructor(private _api: APIService){}


    updateDivision(){

    }

}

