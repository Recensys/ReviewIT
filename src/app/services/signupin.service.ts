/**
 * Created by mk_ti on 13-07-2016.
 */


import {Injectable} from "@angular/core";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';


@Injectable()
export class SignupinService {

  constructor(private http: Http){  }


  public Validate(username: string, password: string) : Observable<string>{


    let body = JSON.stringify({'username': username, 'password': password});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('google.dk', headers, options)
              .map(this.extractData);
  }


  public Create(username: string, password: string) : boolean {



    return false;
  }


  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

}
