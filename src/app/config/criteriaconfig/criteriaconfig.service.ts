import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }    from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {Field, BooleanField} from '../../field';

@Injectable()
export class CriteriaconfigService {
    
    constructor(
      private http: Http
      ) {}

    fields : Field[] =  [
      new BooleanField({Name: 'john'}),
      new BooleanField({Name: 'steve'}),
      new BooleanField({Name: 'mathias'}),
    ]

    getFields(search: string) {
        return this.fields.filter(f => f.Name.indexOf(search) >= 0)
    }

    save(){
      
    }

    private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}