import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-create-login-admin',
  templateUrl: './create-login-admin.component.html',
  styleUrls: ['./create-login-admin.component.css'],
})
export class CreateLoginAdminComponent implements OnInit {
  fullName?: string;
  submitted = false;
  constructor(
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router,
    private helper: JwtHelperService,
    private dialogRef: MatDialogRef<CreateLoginAdminComponent>
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);

    this.fullName = decodedToken.fullName;
  }

  ngOnInit(): void {}

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.required]),
    // retypePassword: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    branch: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    created_by: new FormControl(),
  });

  onSubmit() {
    this.service.createAdmin(this.form.value).subscribe(
      (res) => {
        this.submitted = true;
        this.toastr.success(' Successfully to Create', 'Successfully');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['agent']);
            this.dialogRef.close();
          });
      },
      (error) => {
        console.log(error);
        this.toastr.error(
          'Not Successfully to Create, Pleas check email already exist',
          'Error'
        );
      }
    );
  }
}
