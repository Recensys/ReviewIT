import { Component, OnInit, NgZone } from '@angular/core';

import { Field, StringField, BooleanField, CheckboxField, NumberField, RadioField, ResourceField, FieldComponent } from '../../field';
import { InputTextModule, ButtonModule, RadioButton } from 'primeng/primeng';
import { DataType } from '../../model';

@Component({
  
  selector: 'app-datafieldeditor',
  templateUrl: 'datafieldeditor.component.html',
  styleUrls: ['datafieldeditor.component.css']
})
export class DatafieldeditorComponent implements OnInit {

  fields: Field[] = [];
  newField: Field ;

  dataTypes = DataType;

  constructor() { }

  ngOnInit() {
  }

  addNewField(){
    let field = new BooleanField({Name: 'new field'});
    this.fields.push(field);
  }

  addField(field: Field){
    this.fields.push(field);
    this.newField = new BooleanField({Name: 'new field'});
  }

  selectField(field: Field){
    this.newField = field;
  }

  get getModelJson(){
    return JSON.stringify(this.fields);
  }

  setFieldType(type: number){
    let field = InstanceLoader.getFieldInstance<Field>(type, this.newField.Name);
    field.Name = this.newField.Name;
    field.Type = <DataType>type;
    this.newField = field;
    
  }
}

class InstanceLoader {

    public static map = {
      0 : StringField,
      1 : BooleanField,      
      2 : RadioField,
      3 : CheckboxField,      
      4 : NumberField,
      5 : ResourceField,
    }

    static getFieldInstance<T>(type: number, ...args: any[]) : T {
        var instance = Object.create(this.map[type].prototype);
        instance.constructor.apply(instance, args);
        return <T> instance;
    }

}
