import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-associate-dashboard',
  templateUrl: './associate-dashboard.component.html',
  styleUrls: ['./associate-dashboard.component.css']
})
export class AssociateDashboardComponent {
  constructor(private authService: AuthService,private router:Router){

  }
  logout(){
    this.authService.removeToken();
    this.router.navigateByUrl('/login');

  }

}
