import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class UserService {

  constructor() { }

  private loggedInUserSource = new Subject<any>();

  login$ = this.loggedInUserSource.asObservable();

  user:any;

  logIn(name: string){
    this.loggedInUserSource.next({Name: name});
  }


}
