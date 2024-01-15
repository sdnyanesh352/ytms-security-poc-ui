import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router,
              private authService: AuthService,
              private jwtService: JwtService) {
  }

  navigateByRoles() {
    const token = this.authService.getToken();
    if (token) {
      // Check if route is restricted by role
      const role = this.jwtService.getRoleFromToken(token);
      if (role === 'ROLE_ADMIN_USER') {
        this.router.navigate(['adminDashboard']);
      } else if (role === 'ROLE_NORMAL_USER') {
        this.router.navigate(['userDashboard']);
      } else {
        this.router.navigate(['']);
      }

    }
  }
}
