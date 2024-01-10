import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router,private authService: AuthService) { }
  navigateByRoles(){
    const user = this.authService.getLoginUserDetails();
    console.log("Checking user roles "+user);
    if (user) {
      // Check if route is restricted by role
      // if (route.data['userRole'] && route.data['userRole'].indexOf(user.userRole.roleTypes) === -1)
      if (user.userRole.roleTypes === 'ROLE_ADMIN_USER') {
        this.router.navigate(['adminDashboard']);
      }
      if (user.userRole.roleTypes === 'ROLE_NORMAL_USER') {
       
        this.router.navigate(['userDashboard']);
      } else {
        
        this.router.navigate(['']);
      }
    
    }
  }
}
