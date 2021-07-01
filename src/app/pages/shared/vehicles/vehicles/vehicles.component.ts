import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  fullName?: string;
  options: string[] = [
    'Bmw',
    'Hummer',
    'Isuzu',
    'Jeep',
    'Land Rover',
    'Lexus',
    'Mini',
    'Noah',
    'Nissan',
    'Prado',
    'Pickup',
    'Suzuku',
    'Toyota',
    'Volvo',
  ];
  filteredOptions: Observable<string[]> | undefined;
  // ColorfilteredOptions: Observable<string[]> | undefined;

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

  ngOnInit(): void {
    this.filteredOptions = this.model.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  model = new FormControl('', [Validators.required]);

  form = new FormGroup({
    platenumber: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    model: new FormControl(''),
    chassiNumber: new FormControl('', [Validators.required]),
    seat: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    yearOfManufacture: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required]),

    fullName: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),

    typeOfInsuarance: new FormControl('', [Validators.required]),
    startdate: new FormControl('', [Validators.required]),
    enddate: new FormControl('', [Validators.required]),
    create_by: new FormControl(),
  });

  onSubmit() {
    // console.log(this.form.value);
    this.form.controls.model.setValue(this.model.value);
    // this.form.controls.color.setValue(this.color.value);

    this.service.createInsuarance(this.form.value).subscribe(
      (res) => {
        // console.log(res);
        this.toastr.success(' Successfully to Create', 'Successfully');
        // this.router.navigateByUrl('/');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['insuarance']);
          });
        // this.form.reset();
      },
      (error) => {
        //  console.log(error);
        this.toastr.error('Not Successfully to Create', 'Error');
      }
    );
  }
}
