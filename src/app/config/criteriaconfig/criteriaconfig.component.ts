import { Component, OnInit } from '@angular/core';

import {Field} from '../../field';

import {CriteriaconfigService} from './criteriaconfig.service';
import {SelectItem} from 'primeng/primeng';

@Component({
  
  selector: 'app-criteriaconfig',
  templateUrl: 'criteriaconfig.component.html',
  styleUrls: ['criteriaconfig.component.css']
})
export class CriteriaConfigComponent implements OnInit {

  constructor(private _lookup: CriteriaconfigService) { }


  op: string;

  inclField: Field;
  exclField: Field;

  inclResults: Field[];
  exclResults: Field[];

  model: CriteriaModel = new CriteriaModel();

  // the first operator is initialized on the model in the select methods below
  // when expanding operator types, find out how to do this for the selected type
  boolOperators: SelectItem[] = [
    { label: '==', value: '==' },
    { label: '!=', value: '!=' },
  ]

  ngOnInit() {
    this.model.Exclusions = new Array();
    this.model.Inclusions = new Array();
  }

  save(){
    
  }

  get getModelJson() {
    return JSON.stringify(this.model);
  }

  inclSearch(event) {
    this.inclResults = this._lookup.getFields(event.query);
  }

  exclSearch(event) {
    this.exclResults = this._lookup.getFields(event.query);
  }

  selectInclusion(value: Field) {
    let fc = new FieldCriteria();
    fc.Field = value;
    fc.Operator = this.boolOperators[0].value;
    this.model.Inclusions.push(fc);
    this.inclField = null;
  }

  selectExclusion(value: Field) {
    let fc = new FieldCriteria();
    fc.Field = value;
    fc.Operator = this.boolOperators[0].value;
    this.model.Exclusions.push(fc);
    this.exclField = null;
  }

}

class CriteriaModel {
  Inclusions: FieldCriteria[];
  Exclusions: FieldCriteria[];
}

class FieldCriteria {
  Field: Field;
  Operator: string;
  Value: string;
}
