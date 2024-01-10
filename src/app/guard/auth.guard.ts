import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAuthentication(route, state);
  }

  private checkAuthentication(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this.authService.isAuthenticated()) {
      const user = this.authService.getLoginUserDetails();
      if (user) {
        // Check if route is restricted by role
        if (user.userRole.roleTypes === 'ROLE_NORMAL_USER') {
          // Role not authorized, redirect to home page
          return true;
        } else {
          // Not authenticated, redirect to user dashboard or handle accordingly
          this.router.navigate(['']);
          return false;
        }
      }
      // User details not available, handle accordingly
    } else {
      // Not authenticated, redirect to user dashboard or handle accordingly
      this.router.navigate(['']);
      return false;
    }
  }
}
