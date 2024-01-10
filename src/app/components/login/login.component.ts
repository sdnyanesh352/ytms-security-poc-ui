import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiServiceService} from 'src/app/services/api-service.service';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]),
  });
  role_id: any

  constructor(private router1: Router, private apiService: ApiServiceService, private toastrService: ToastrService, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  signIn() {
    if (!this.loginForm.valid) {
      return;
    }
    let user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,


    }
    this.apiService.login(user).subscribe(res => {
        if (res.token != null) {
          this.toastrService.success('Login Successfully!', 'Success');
          this.authService.storeToken(res.token, res.user);
          if (res.user.userRole.roleTypes == 'ROLE_ADMIN_USER')
            this.router1.navigateByUrl('/adminDashboard');

          if (res.user.userRole.roleTypes == 'ROLE_NORMAL_USER')
            this.router1.navigateByUrl('/userDashboard');
        } else {
          if (res.hasOwnProperty('error')) {
            this.toastrService.warning(res.error, 'Warning1');
          } else {
            this.toastrService.warning(res.error, 'Admin is working on your registration kindly wait for some time');
          }
        }
      },
      err => {
        this.toastrService.error('An error has occured, Please try again!', 'Error');
        this.authService.removeToken();
      });
  }

}
