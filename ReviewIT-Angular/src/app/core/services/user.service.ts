import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';

import { UserDetailsDTO } from '../../model/models';
import { AdalConfig, Authentication, AuthenticationContext } from 'adal-ts'
import { environment } from '../../../environments/environment'

@Injectable()
export class UserService {

  constructor(private _cookieService: CookieService, private router: Router) {
    this.adal = Authentication.getContext(this.adalConfig)

    let adalUser = this.adal.getUser();
    if (adalUser) {
      let user = new UserDetailsDTO();
      user.FirstName = adalUser.given_name;
      user.LastName = adalUser.family_name;
      this.loggedInUserSource.next(user);
    }
  }

  private get adalConfig() {
    return {
      clientId: environment.clientId,
      postLogoutRedirectUrl: environment.postLogoutRedirectUrl,
      redirectUri: environment.redirectUri,
      tenant: environment.tenant
    }
  }

  private adal: AuthenticationContext;
  private loggedInUserSource = new BehaviorSubject<UserDetailsDTO>(null);

  get login$() {
    return this.loggedInUserSource.asObservable();
  }

  get getUser() {
    return this.loggedInUserSource.getValue();
  }

  get token(){
    return this.adal.getToken();
  }

  logIn() {
    this.adal.login();
  }

  logOut() {
    this.adal.logout();
    // this.router.navigate(['who']);
  }



}
