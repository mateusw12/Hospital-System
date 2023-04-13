import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { NavigationService } from '@module/service';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuardsService implements CanActivate, CanActivateChild {

  constructor(
    private authenticationService: AuthenticationService,
    private navigationService: NavigationService
  ){}
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = this.authenticationService.isTokenValid();
    if (token) {
      return true;
    }
    this.navigationService.navigateToLoginPage();
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = this.authenticationService.isTokenValid();
    if (token) {
      return true;
    }
    this.navigationService.navigateToLoginPage();
    return false;
  }

}
