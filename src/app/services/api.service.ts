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
import {Task} from '../model/task';


@Injectable()
export class APIService {

  constructor(private http: Http, private _cookieService:CookieService){  }

  /***
   * USER METHODS
   */
  public ValidateUser(username: string, password: string) : Observable<string>{
    let body = JSON.stringify({'Username': username, 'Password': password});

    return this.http.post(Globals.api+'login', body, this.GetOptions)
              .map(this.extractData).catch(this.handleError);
  }

  public CreateUser(username: string, password: string) : Observable<string> {
    let body = JSON.stringify({'Username': username, 'Password': password});
    
    let url = Globals.api+'user/create';

    return this.http.post(url, body, this.GetOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /***
   * TASK METHODS
   */
  public GetTask(id: number) : Observable<Task>{
    let url = Globals.api + 'task/' + id;

    return this.http.get(url, this.GetOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }




  /*** 
   * HELPER METHODS 
  */
  private GetOptions () : RequestOptions {
      let token = this._cookieService.get('token');
      let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8'});
      if (token) {
        headers.append('sessionToken',token);
      }
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
    let body = res.json();
    return body.data || { };
  }

}
