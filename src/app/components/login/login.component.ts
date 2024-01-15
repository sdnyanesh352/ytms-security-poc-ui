import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiServiceService} from 'src/app/services/api-service.service';
import {AuthService} from 'src/app/services/auth.service';
import {UserService} from 'src/app/services/user.service';
import {JwtService} from "../../services/jwt.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(null,
      [Validators.required, Validators.email]),
    password: new FormControl(null,
      [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]),
  });
  role_id: any

  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private jwtService: JwtService,
              private apiService: ApiServiceService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated())
      this.userService.navigateByRoles();
  }

  ngOnChanges() {

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
          this.authService.storeToken(res.token);
          this.routeUserDashboard();
        }
      },
      err => {
        this.toastrService.error('An error has occured, Please try again!', 'Error');
        this.authService.removeToken();
      });
  }

  private routeUserDashboard() {
    const token = this.authService.getToken();
    const role = this.jwtService.getRoleFromToken(token);
    if (role == 'ROLE_ADMIN_USER')
      this.router.navigateByUrl('/adminDashboard');

    if (role == 'ROLE_NORMAL_USER')
      this.router.navigateByUrl('/userDashboard');
  }
}
