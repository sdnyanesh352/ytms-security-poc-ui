import { CanActivateFn } from '@angular/router';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAuthentication(route, state);
  }
 
  private checkAuthentication(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      const user = this.authService.getLoginUserDetails();
      if (user) {
        // Check if route is restricted by role
        if (route.data['roles'] && route.data['roles'].indexOf(user.role.roleName) === -1) {
          // Role not authorized, redirect to home page
          return this.router.createUrlTree(['/adminDashboard']);
        }
        // Authorized, proceed with navigation
        return true;
      }
      // User details not available, handle accordingly
      return this.router.createUrlTree(['/userDashboard']);
    } else {
      // Not authenticated, redirect to user dashboard or handle accordingly
      return this.router.createUrlTree(['/userDashboard']);
    }
  }
}