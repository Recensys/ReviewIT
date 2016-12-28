import { Injectable } from '@angular/core'
import { Http, RequestOptions, Headers, RequestOptionsArgs, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment'
import { UserService } from '../core'

@Injectable()
export class httpService{

    constructor(
        private http: Http,
        private user: UserService
    ) {
    }

    get(path: string, options?: RequestOptionsArgs): Observable<any> {
        return this.http.get(environment.api+path, this.addAuthOptions(options))
            .map(this.extractJson)
            .catch(this.handleError)
    }

    post(path: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        return this.http.post(environment.api+path, body, this.addAuthOptions(options))
            .map(this.extractJson)
            .catch(this.handleError)        
    }

    put(path: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        return this.http.put(environment.api+path, body, this.addAuthOptions(options))
            .map(this.extractJson)
            .catch(this.handleError)
    }

    delete(path: string, options?: RequestOptionsArgs): Observable<any> {
        return this.http.delete(environment.api+path, this.addAuthOptions(options))
            .map(this.extractJson)
            .catch(this.handleError)
    }

    private addAuthOptions(args: RequestOptionsArgs): RequestOptions {
        let options = new RequestOptions();
        let headers = new Headers();
        options.merge(args);
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'Bearer ' + this.user.token);
        options.headers = headers;
        return options;
    }
    

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(error); // log to console instead
        return Observable.throw(error);
    }

    private extractJson(res: Response) {
        return res.json();
    }

}