import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { UserDetailsDTO } from '../../model'
import { environment } from '../../../environments/environment'


@Injectable()
export class UserHttpService {

    constructor(
        private http: Http
    ){}

    private graphApi = 'https://graph.microsoft.com/'


    userExists(token: string): Observable<boolean> {
        return this.http.get(`${environment.api}user/userExists`, this.authOptions(token))
            .map(this.extractJson)
            .catch(this.handleError);
    }

    getUser(token: string): Observable<UserDetailsDTO> {
        return this.http.get(`${environment.api}user`, this.authOptions(token))
            .map(this.extractJson)
            .catch(this.handleError);
    }

    postUser(token: string, user: UserDetailsDTO) {
        return this.http.post(`${environment.api}user`, user, this.authOptions(token))
            .map(this.extractJson)
            .catch(this.handleError);
    }

    updateUser(token: string, user: UserDetailsDTO) {
        return this.http.put(`${environment.api}user`, user, this.authOptions(token))
            .map(this.extractJson)
            .catch(this.handleError);
    }

    getUserDetaildFromGraph(token: string): Observable<any> {
        return this.http.get(`${this.graphApi}v1.0/me/`, this.authOptions(token))
            .map(this.extractJson)
            .catch(this.handleError);
    }

    private authOptions(token: string): RequestOptions {
        let options = new RequestOptions();
        let headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'Bearer ' + token);
        options.headers = headers;
        return options;
  }

  private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(error); // log to console instead
        return Observable.throw(errMsg);
    }

    private extractJson(res: Response) {
        return res.json();
    }
}