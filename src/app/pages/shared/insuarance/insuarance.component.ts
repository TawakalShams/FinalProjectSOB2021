import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';
import { JwtHelperService } from '@auth0/angular-jwt';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-insuarance',
  templateUrl: './insuarance.component.html',
  styleUrls: ['./insuarance.component.css'],
})
export class InsuaranceComponent implements OnInit {
  fullName?: string;
  role?: string;
  submitted = false;
  platenumber: any;
  vehcleid: any;
  vehcle: any;

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
    vehicleid: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    seat: new FormControl('', [Validators.required]),
    manufacture: new FormControl('', [Validators.required]),
    startdate: new FormControl('', [Validators.required]),
    enddate: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required]),
    create_by: new FormControl(),
  });

  ngOnInit(): void {
    this.service.vehiclesPayed().subscribe((data: any) => {
      this.vehcle = data.vehicles;
      // console.log(this.form.value);
    });
  }
  onSubmit() {
    this.service.createInsuarance(this.form.value).subscribe(
      (res) => {
        this.submitted = true;
        this.toastr.success('Successfully', 'Successfully');
        this.router.navigateByUrl('/');
        this.form.reset();
        console.log(res);
      },
      (error) => {
        // console.log(error);
        this.toastr.error(
          'Not Successfully, Platenumber is already used',
          'Error'
        );
      }
    );
  }
}
