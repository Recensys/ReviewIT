import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs'
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/take';
import { Field } from '../../field';

import { CriteriaconfigService } from './criteriaconfig.service';
import { SelectItem } from 'primeng/primeng';

import {FieldDTO} from '../../model/models'

@Component({

  selector: 'app-criteriaconfig',
  templateUrl: 'criteriaconfig.component.html',
  styleUrls: ['criteriaconfig.component.css']
})
export class CriteriaConfigComponent implements OnInit {

  constructor(
    private _lookup: CriteriaconfigService,
    private route: ActivatedRoute
  ) { }

  fields: Observable<FieldDTO[]>;
  term = new FormControl();

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

    this.route.parent.params.forEach((params: Params) => {
			let studyId = +params['id'];
    
      this.fields = this.term.valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .switchMap(term => this._lookup.search(studyId, term) );
    });
  }

  save() {

  }


  // inclSearch(event) {
  //   this.inclResults = this._lookup.getFields(event.query);
  // }

  // exclSearch(event) {
  //   this.exclResults = this._lookup.getFields(event.query);
  // }

  addInclusion(value: Field){
    let fc = new FieldCriteria();
    fc.Field = value;
    fc.Operator = this.boolOperators[0].value;
    this.model.Inclusions.push(fc);
    this.inclField = null;
  }
  
  addExclusion(value: Field) {
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
