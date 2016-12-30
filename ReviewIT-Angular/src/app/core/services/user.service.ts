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

    // check if stored token is expired
    var jwtHelper = new JwtHelper();    
    if(jwtHelper.tokenExpired(this.adal.getToken())) this.logOut();

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

  get token() {
    return this.adal.getToken();
  }

  get isAuthenticated(): boolean {
    return this.adal.getUser() != null;
  }

  logIn() {
    this.adal.login();
  }

  logOut() {
    this.adal.logout();
  }
}


class JwtHelper {
  private urlBase64Decode(str: string) {
    var output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: { break; }
      case 2: { output += '=='; break; }
      case 3: { output += '='; break; }
      default: {
        throw 'Illegal base64url string!';
      }
    }
    return decodeURIComponent((<any>window).escape(window.atob(output)));
  }

  public tokenExpired(token: string): boolean {
    var parsedToken = this.decodeToken(token);
    var expiryTime = new Date(parsedToken.exp * 1000);
    var now = new Date();
    return now > expiryTime
  }

  public decodeToken(token: string = "") {
    if (token === null || token === "") return { "upn": "" };
    var parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }
    var decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
  }
}