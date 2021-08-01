import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from 'src/app/module/ims/ims.module';

@Component({
  selector: 'app-agentregstration',
  templateUrl: './agentregstration.component.html',
  styleUrls: ['./agentregstration.component.css'],
})
export class AgentregstrationComponent implements OnInit {
  submitted = false;
  fullName?: string;
  role?: any;

  constructor(
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router,
    private helper: JwtHelperService
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);

    this.fullName = decodedToken.fullName;
    this.role = decodedToken.role;
  }
  form = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    password: new FormControl(''),
    // retypePassword: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    branch: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    create_by: new FormControl(),
  });

  ngOnInit(): void {}
  onSubmit() {
    this.service.createAgent(this.form.value).subscribe(
      (res) => {
        // console.log(res);
        this.submitted = true;
        this.toastr.success('Successfully to Create', 'Successfully');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['usersRegstration']);
          });
        // this.router.navigateByUrl('/');
        // this.form.reset();
        // console.log(res);
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
