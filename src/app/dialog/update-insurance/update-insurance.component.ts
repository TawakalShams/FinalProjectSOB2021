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

@Component({
  selector: 'app-update-insurance',
  templateUrl: './update-insurance.component.html',
  styleUrls: ['./update-insurance.component.css'],
})
export class UpdateInsuranceComponent implements OnInit {
  rows: any;
  insuaranceid: any;
  Data: any;
  vehicles = new ImsModule();
  fullName?: string;
  role?: string;
  customerid: any;
  vehicleid: any;
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public DATA: any,
    private service: ServiceService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private helper: JwtHelperService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<UpdateInsuranceComponent>
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
    const fullName = (this.fullName = this.DATA.fullName);
    const customerid = (this.customerid = this.DATA.customerid);
    // console.log(this.DATA);
    this.viewSingleInsuarance();
  }
  viewSingleInsuarance() {
    this.service
      .getSingleInsuarance(this.DATA.vehicleid)
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
    const updatae = this.service
      .updateInsuarance(this.DATA.insuaranceid, this.form.value)
      .subscribe((res) => {
        // console.log(res);
      });
    if (updatae) {
      this.toastr.success('Updated', 'Successfully');
      this.router
        .navigateByUrl('viewcustomerpayment', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['viewcustomerpayment']);
        });
      // this.router.navigate(['viewcustomerpayment']);

      this.dialogRef.close();
    } else {
      this.toastr.success('Not Success', 'Error');
    }
  }
}
