import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from 'src/app/module/ims/ims.module';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  fullName?: string;

  constructor(
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router,
    private helper: JwtHelperService
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);
    this.fullName = decodedToken.fullName;
  }

  ngOnInit(): void {}

  form = new FormGroup({
    platenumber: new FormControl('', [Validators.required]),

    type: new FormControl('', [Validators.required]),
    created_by: new FormControl(),
  });
  onSubmit() {
    this.service.createVehicle(this.form.value).subscribe(
      (res) => {
        this.toastr.success('Vehicle Successfully to Create', 'Successfully');
        // this.router.navigateByUrl('/');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['vehicle']);
          });
        // this.form.reset();
      },
      (error) => {
        //  console.log(error);
        this.toastr.error('Vehicle not Successfully to Create', 'Error');
      }
    );
  }
}
