import {Component} from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { AuthService } from 'src/app/services/auth.service';

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

 constructor(private router1:Router, private apiService: ApiServiceService, private toastrService: ToastrService, private authService: AuthService)
  { }
role_id:any
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
    this.apiService.login(user).
      subscribe(res => {
        
       
        if (res.status == "200" && res.user.role.roleId!==4 ) {

     
          this.toastrService.success('Login Successfully!', 'Success');
          this.authService.storeToken(res.authToken, res.user);
          this.router1.navigateByUrl('/userDashboard');

          console.log(res.user);
          this.role_id=res.user.role.roleId;
          console.log(this.role_id);
        }else {
          if(res.hasOwnProperty('error')){
            this.toastrService.warning(res.error, 'Warning1');
          }else {
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
