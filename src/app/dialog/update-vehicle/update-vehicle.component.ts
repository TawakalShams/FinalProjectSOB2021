import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { DecodedToken, ImsModule } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css'],
})
export class UpdateVehicleComponent implements OnInit {
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
  rows: any;
  agentid: any;
  Data: any;
  vehicles = new ImsModule();
  fullName?: string;
  role?: string;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public DATA: any,
    private service: ServiceService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private helper: JwtHelperService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<UpdateVehicleComponent>
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);
    this.fullName = decodedToken.fullName;
    this.role = decodedToken.role;
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
  ngOnInit(): void {
    this.filteredOptions = this.model.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value))
    );
    this.ViewSingVehicle();
    // console.log(this.DATA);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  ViewSingVehicle() {
    this.service
      .getSingleVehicle(this.DATA.vehicleid)
      .subscribe((data: any) => {
        this.Data = data;

        // console.log(this.vehicles.type);
        this.form.controls.fullName.setValue(this.DATA.fullName);
        this.form.controls.address.setValue(this.DATA.address);
        this.form.controls.dob.setValue(this.DATA.dob);
        this.form.controls.enddate.setValue(this.DATA.enddate);
        this.form.controls.gender.setValue(this.DATA.gender);
        this.form.controls.phone.setValue(this.DATA.phone);
        this.form.controls.typeOfInsuarance.setValue(
          this.DATA.typeOfInsuarance
        );

        this.form.controls.startdate.setValue(this.DATA.startdate);
        this.form.controls.type.setValue(this.DATA.type);
        this.form.controls.platenumber.setValue(this.DATA.platenumber);
        this.form.controls.type.setValue(this.DATA.type);
        this.form.controls.model.setValue(this.DATA.model);
        this.form.controls.chassiNumber.setValue(this.DATA.chassiNumber);
        this.form.controls.seat.setValue(this.DATA.seat);
        this.form.controls.color.setValue(this.DATA.color);
        this.form.controls.yearOfManufacture.setValue(
          this.DATA.yearOfManufacture
        );
        this.form.controls.value.setValue(this.DATA.value);

        // this.form.updateValueAndValidity();
      });
  }

  update() {
    // console.log(this.form.value);
    const updatae = this.service
      .updateInsuarance(this.DATA.vehicleid, this.form.value)
      .subscribe((res) => {});
    if (updatae) {
      this.toastr.success('Updated', 'Successfully');
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['viewvehicle']);
      });
      this.dialogRef.close();
    }
  }
}
