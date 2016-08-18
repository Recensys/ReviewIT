import {Component, OnInit} from '@angular/core';

import {APIService} from '../../services/api.service';
import {COMMON_DIRECTIVES} from '@angular/common';


@Component({
    moduleId: module.id,
    selector: 'app-review-strategy',
    templateUrl: 'review-strategy.component.html',
    styleUrls: ['review-strategy.component.css'],
    providers: [],
    directives: [COMMON_DIRECTIVES]
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

