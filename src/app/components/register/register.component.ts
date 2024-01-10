
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { CustomValidators } from '../Validators/CustomValidators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    fullName: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]),
    passwordConfirm: new FormControl(null, [Validators.required]),
      },
    // add custom Validators to the form, to make sure that password and passwordConfirm are equal
    { validators: CustomValidators.passwordsMatching }
  )

  constructor(private apiService: ApiServiceService, private router: Router, private toastrService: ToastrService) { }
  message:boolean=false;

  ngOnInit(): void {
  }

  register() {
    console.log(this.registerForm.value);
    if (!this.registerForm.valid) {
      return;
    }
    let user = {
      fullName: this.registerForm.value.fullName,
      emailAdd: this.registerForm.value.email,
      password: this.registerForm.value.passwordConfirm,
    }
    this.apiService.register(user).
    
      subscribe(res => {
        console.log("User for registration is "+res);
        if (Object.keys(res).length > 0) {
          if(res.hasOwnProperty('error')){
            this.toastrService.warning(res.error, 'Warning');
          }else {
            this.toastrService.success('Register Successfully!', 'Success');
            this.router.navigate(['/register']);
          }
          this.message=true;
        } else {

        }
      },
      err => {
        this.toastrService.error('An error has occured, Please try again!', 'Error');
      });
  }

}
