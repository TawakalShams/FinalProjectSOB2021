import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddCarModelComponent } from 'src/app/dialog/add-car-model/add-car-model.component';
// import { AnyARecord } from 'node:dns';

@Component({
  selector: 'app-insuarance',
  templateUrl: './insuarance.component.html',
  styleUrls: ['./insuarance.component.css'],
})
export class InsuaranceComponent implements OnInit {
  // options: string[] = [
  //   'Bmw',
  //   'Hummer',
  //   'Isuzu',
  //   'Jeep',
  //   'Land Rover',
  //   'Lexus',
  //   'Mini',
  //   'Noah',
  //   'Nissan',
  //   'Prado',
  //   'Pickup',
  //   'Suzuku',
  //   'Toyota',
  //   'Volvo',
  // ];
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  fullName?: string;
  role?: string;
  submitted = false;
  vehcleid: any;
  vehcle: any;

  constructor(
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router,
    private helper: JwtHelperService,
    public dialog: MatDialog
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);
    this.fullName = decodedToken.fullName;
    this.role = decodedToken.role;
  }

  platenumber = new FormControl('', [Validators.required]);
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
    password: new FormControl('', [Validators.required]),

    typeOfInsuarance: new FormControl('', [Validators.required]),
    startdate: new FormControl('', [Validators.required]),
    enddate: new FormControl('', [Validators.required]),
    create_by: new FormControl(),
  });

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.filteredOptions = this.model.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value))
    );

    this.service.viewCarModel().subscribe((data: any) => {
      // this.vehcle = data;
      console.log(data);
      this.options = [
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
      // console.log(this.options);

      // this.options = ['Carsf', 'gar'];
      // this.options = data.map((item: any) => item.name);
      // console.log('option' + this.options);
    });
  }

  addmodel() {
    const dialogRef = this.dialog.open(AddCarModelComponent, {});
  }
  onSubmit() {
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
