/**
 * Created by mk_ti on 13-07-2016.
 */


import {Injectable} from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import Globals = require('../globals');
import {CookieService} from 'angular2-cookie/core';
import {TasksModel} from '../model/tasksModel';
import {Field} from '../model/field';
import {Task} from '../model/task';
import {StringField} from '../fields/string.field';
import {ResourceField} from '../fields/resource.field';
import {RadioField} from '../fields/radio.field';
import {NumberField} from '../fields/number.field';
import {CheckboxField} from '../fields/checkbox.field';
import {BooleanField} from '../fields/boolean.field';


@Injectable()
export class APIService {

  constructor(private http: Http, private _cookieService:CookieService){  }



  /***
   * USER METHODS
   */
  public ValidateUser(username: string, password: string) : Observable<string>{
    let body = JSON.stringify({'Username': username, 'Password': password});

    return this.http.post(Globals.api+'login', body, this.GetOptions())
              .map(this.extractData)
              .catch(this.handleError);
  }

  public CreateUser(username: string, password: string) : Observable<string> {
    let body = JSON.stringify({'Username': username, 'Password': password});
    
    let url = Globals.api+'user/create';

    return this.http.post(url, body, this.GetOptions())
      .map(this.extractData)
      .catch(this.handleError);
  }

  /***
   * TASK METHODS
   */
  public GetTask(id: number) : Observable<TasksModel>{
    let url = Globals.api + 'task/' + id;
    return this.http.get(url, { withCredentials: true })
      .map(this.exstractTasksModel)
      .catch(this.handleError);
  }




  /*** 
   * HELPER METHODS 
  */
  private GetOptions () : RequestOptions {
      let token = this._cookieService.get('token');
      console.log('stored token: '+token);
      let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8'});
      headers.append('withCredentials','true');
        headers.append('sessiontoken','token');
        console.log(headers);
      
      let options = new RequestOptions({ headers: headers });
      return options
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  private extractData(res: Response) {
    return res.json();
  }

  private exstractTasksModel(res: Response){
    let json = res.json();
    let fields: Field[] = [];
    let tasks: Task[] = [];
    console.log(json);
    json['Fields'].forEach(element => {
      var field = InstanceLoader.getFieldInstance<Field>(element.DataType, element);
      fields.push(field)
    });

    json['Tasks'].forEach(element => {
      tasks.push(new Task(element));
    })

    return new TasksModel(fields,tasks);
  }

  


}

class InstanceLoader {

    private static map = {
      '0' : StringField,
      '1' : BooleanField,      
      '2' : RadioField,
      '3' : CheckboxField,      
      '4' : NumberField,
      '5' : ResourceField,
    }

    static getFieldInstance<T>(name: string, ...args: any[]) : T {
        var instance = Object.create(this.map[name].prototype);
        instance.constructor.apply(instance, args);
        return <T> instance;
    }

}
