import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs'
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchmap';
import 'rxjs/add/operator/take';
import { Field } from '../../field';
import { MessageService } from '../../core'

import { CriteriaconfigService } from './criteriaconfig.service';
import { SelectItem } from 'primeng/primeng';

import { FieldDTO, CriteriaDTO, FieldCriteriaDTO } from '../../model/models'

@Component({

  selector: 'app-criteriaconfig',
  templateUrl: 'criteriaconfig.component.html',
  styleUrls: ['criteriaconfig.component.css']
})
export class CriteriaConfigComponent implements OnInit {

  constructor(
    private api: CriteriaconfigService,
    private route: ActivatedRoute,
    private msg: MessageService
  ) { }

  fields: Observable<FieldDTO[]>;
  term = new FormControl();

  op: string;

  inclField: Field;
  exclField: Field;

  inclResults: Field[];
  exclResults: Field[];

  model: CriteriaDTO;
  studyId: number;

  // the first operator is initialized on the model in the select methods below
  // when expanding operator types, find out how to do this for the selected type
  boolOperators: SelectItem[] = [
    { label: '==', value: '==' },
    { label: '!=', value: '!=' },
  ]

  ngOnInit() {
    this.route.parent.params.forEach((params: Params) => {
			let studyId = +params['id'];
      this.studyId = studyId;
      this.api.get(studyId).subscribe(
        dto => this.model = dto,
        error => this.msg.addError(error)
      )
    
      this.fields = this.term.valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .switchMap(term => this.api.search(studyId, term) );
    });
  }

  save() {
    this.api.save(this.studyId, this.model).subscribe(
      bool => this.msg.addSuccess('criteria updated!'),
      error => this.msg.addError(error)
    )
  }


  // inclSearch(event) {
  //   this.inclResults = this._lookup.getFields(event.query);
  // }

  // exclSearch(event) {
  //   this.exclResults = this._lookup.getFields(event.query);
  // }

  addInclusion(value: FieldDTO){
    let fc = new FieldCriteriaDTO();
    fc.Field = value;
    fc.Operator = this.boolOperators[0].value;
    this.model.Inclusions.push(fc);
    this.inclField = null;
  }

  addExclusion(value: FieldDTO) {
    let fc = new FieldCriteriaDTO();
    fc.Field = value;
    fc.Operator = this.boolOperators[0].value;
    this.model.Exclusions.push(fc);
    this.exclField = null;
  }

}
