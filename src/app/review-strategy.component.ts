import {Component, OnInit} from '@angular/core';
import {APIService} from './services/api.service';
import {COMMON_DIRECTIVES} from '@angular/common';
import {Ng2SliderComponent} from 'ng2-slider-component/ng2-slider.component';


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
                <a (click)="setPreset(preset)" class="dropdown-item" *ngFor="let preset of presets">{{preset.Name}}</a>
            </div>
            </div>
          <p class="col-sm-10  text-muted">
            This is a preset for how to distribute tasks between researchers. You can change to a custom configuration by draging the bars below.
          </p>
        </div>

        <div class="form-group">
        <label for="power">Hero Power</label>
        <select class="form-control" required>
            <option *ngFor="let p of presets" [value]="p">{{p}}</option>
        </select>
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
              <ng2-slider id="{{researcher.Id}}" #range min="0" max="100" startValue="{{researcher.start}}" endValue="{{researcher.end}}" (onRangeChanged)=updateRange($event)>
              </ng2-slider>
            </div>
          </div>

          
          <!--
        <dt class="col-sm-12 text-truncate">
          <span class="label label-primary"> Add researcher
          </span>
        </dt>-->
        <!--<dd class="col-sm-10"></dd>-->
        </dl>
      </div>
    </div>
    <div class="card-footer">
      <a (click)="updateDivision()" class="btn btn-primary">Save</a>
    </div>
  </div>
    `
})

export class ReviewStrategyComponent{

    public model2 = "mooooodel2";

    presets: Array<any> = [
        {Id: 0, Name: "Equal Distribution"},
        {Id: 1, Name: "Full Overlap"},
    ]
    researchers: Array<any> = [
        {Id: 0, Name: "Mathias", start: 50, end: 75},
        {Id: 1, Name: "Jacob", start: 0, end: 50}
    ]

    constructor(private _api: APIService){}


    setPreset(preset){
      switch (preset.Id) {
        case 0:
          this.setEqualDivision();
          break;
        case 1:
          this.setOverlapDivision();
          break;
      
        default:
          break;
      }
    }

    setEqualDivision(){
        let count = this.researchers.length;
        let division = 100 / count;
        let start = 0;
        this.researchers.forEach(element => {
          element.start = start;
          element.end = start+division;
          start = element.end;
        });
    }

    setOverlapDivision(){
      this.researchers.forEach(element => {
        element.start = 0;
        element.end = 100;
      })
    }
    

    updateRange(event){
      let researcher = this.researchers.filter(e => e.Id == event.id)[0];
      researcher.start = event.startValue;
      researcher.end = event.endValue;
      console.log(this.researchers)
    }

}

