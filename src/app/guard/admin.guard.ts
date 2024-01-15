import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import Swal from 'sweetalert2';
import {JwtService} from "../services/jwt.service";

@Injectable({
  providedIn: "root"
})

export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService,
              private jwtService: JwtService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication(route, state);
  }

  private checkAuthentication(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this.authService.isAuthenticated()) {
      const token = this.authService.getToken();
      if (token != undefined) {
        //get roles from token
        const role = this.jwtService.getRoleFromToken(token);
        // Check if route is restricted by role
        if (role === 'ROLE_ADMIN_USER') {
          // Role not authorized, redirect to home page
          return true;
        } else {
          // Not authenticated, redirect to user dashboard or handle accordingly
          if (role === 'ROLE_NORMAL_USER') {
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
