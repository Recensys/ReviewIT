import { Injectable } from '@angular/core';
import {
  CanLoad, CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { UserService } from './core';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canLoad(): boolean {
    if (this.userService.isAuthenticated) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }

  canActivate(){
    if (this.userService.isAuthenticated) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}