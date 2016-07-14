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


@Injectable()
export class APIService {

  constructor(private http: Http){  }

  /****
   * 
   * @param username
   * @param password
   * @returns {Observable<R>}
   * @constructor
     */

  public Validate(username: string, password: string) : Observable<string>{


    let body = JSON.stringify({'Username': username, 'Password': password});
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(Globals.api+'login', body, options)
              .map(this.extractData).catch(this.handleError);
  }


  public Create(username: string, password: string) : Observable<string> {


    let body = JSON.stringify({'Username': username, 'Password': password});
    let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(Globals.api+'user/create', body, options)
      .map(this.extractData).catch(this.handleError);

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
