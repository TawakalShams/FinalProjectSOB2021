import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ServiceService } from 'src/app/service/service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  submitted = false;
  returnUrl!: string;
  error: {} | undefined;
  loginError!: string;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(
      private router: Router,
      private fb: FormBuilder,
      private service: ServiceService,
      private toast: ToastrService
      ) { }
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      // Validators.minLength(5)
    ]),
    password: new FormControl('', [
      Validators.required,
      // Validators.minLength(8)
    ]),
});


  ngOnInit(): void {
  }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    this.submitted = true;
    this.service.login(this.loginForm.value).subscribe((data) => {
       if (this.service.isLoggedIn()) {
          const redirect = this.service.redirectUrl ? this.service.redirectUrl : '/agent';
          this.router.navigate([redirect]);
          this.toast.success('Success to login', 'Success');
        
        } else {
          //this.loginError = 'Username or password is incorrect.';
          this.toast.error('Incorrect email or password!', 'Error Message!');
        }
      },
      error => this.error = error
    );
  }
   // this.toast.error('Incorrect email or password!', 'Error Message!');
   //console.log(this.loginForm.value)

}


