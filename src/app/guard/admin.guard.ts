import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: "root"
})

export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication(route, state);
  }

  private checkAuthentication(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this.authService.isAuthenticated()) {
      const user = this.authService.getLoginUserDetails();
      if (user) {
        // Check if route is restricted by role
        // if (route.data['userRole'] && route.data['userRole'].indexOf(user.userRole.roleTypes) === -1)
        if (user.userRole.roleTypes === 'ROLE_ADMIN_USER') {
          // Role not authorized, redirect to home page
          // return this.router.createUrlTree(['/userDashboard']);
          return true;
        } else {
          // Not authenticated, redirect to user dashboard or handle accordingly
          if (user.userRole.roleTypes === 'ROLE_NORMAL_USER') {
            Swal.fire('Error', 'Unauthorized', 'error');
            this.router.navigate(['userDashboard']);
          } else {
            Swal.fire('Error', 'Unauthorized', 'error');
            this.router.navigate(['']);
          }
          return false;
        }
      }
      // User details not available, handle accordingly
      // return this.router.createUrlTree(['/userDashboard']);
    } else {
      // Not authenticated, redirect to user dashboard or handle accordingly
      this.router.navigate(['']);
      return false;
    }
  }
}
