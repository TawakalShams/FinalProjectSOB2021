import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  filteredOptions: Observable<string[]> | undefined;
  options: string[] = [];
  fullName?: string;
  role?: string;
  submitted = false;
  vehcle: any;
  // platenumber: String | undefined;
  vehcleid: String | undefined;
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option: any) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  ngOnInit(): void {
    this.filteredOptions = this.service
      .viewVehicles()
      .pipe(map((data) => data.vehicles.map((item: any) => item.platenumber)));

    this.filteredOptions = this.platenumber.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value))
    );

    this.service.viewVehicles().subscribe((data: any) => {
      this.vehcle = data.vehicles;
      this.options = data.vehicles.map((item: any) => item.platenumber);
      // console.log(data);
    });
  }

  platenumber = new FormControl('', [Validators.required]);

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    vehicleid: new FormControl(''),
    created_by: new FormControl(),
  });

  onSubmit() {
    this.form.controls.vehicleid.setValue(this.platenumber.value);
    console.log(this.form.value);
    // this.service.createCustomer(this.form.value).subscribe(
    //   (res) => {
    //     this.submitted = true;
    //     this.toastr.success('Customer Successfully to Create', 'Successfully');
    //     this.router
    //       .navigateByUrl('/', { skipLocationChange: true })
    //       .then(() => {
    //         this.router.navigate(['customer']);
    //       });
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.toastr.error(
    //       'Customer not Successfully to Create, Platenumber alredy used',
    //       'Error'
    //     );
    //   }
    // );
  }
}
