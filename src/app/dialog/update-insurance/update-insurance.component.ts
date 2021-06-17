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

  // form = new FormGroup({
  //   // fullName: new FormControl('', [Validators.required]),
  //   amount: new FormControl('', [Validators.required]),
  //   customerid: new FormControl('', [Validators.required]),
  //   create_by: new FormControl(),
  // });
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
    const fullName = (this.fullName = this.DATA.fullName);
    const customerid = (this.customerid = this.DATA.customerid);
    // console.log(this.form.value);
    // this.insuarance();
    this.service
      .getSingleInsuarance(this.DATA.insuaranceid)
      .subscribe((data) => {
        this.Data = data;
        // this.form.controls.vehicleid.setValue(this.DATA.platenumber);
        this.form.controls.color.setValue(this.DATA.color);
        this.form.controls.seat.setValue(this.DATA.seat);
        this.form.controls.manufacture.setValue(this.DATA.manufacture);
        this.form.controls.startdate.setValue(this.DATA.startdate);
        this.form.controls.enddate.setValue(this.DATA.enddate);
        this.form.controls.value.setValue(this.DATA.value);
        this.form.controls.vehicleid.setValue(this.DATA.vehicleid);
        this.form.controls.create_by.setValue(this.DATA.create_by);
        // console.log(data);
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
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['viewinsuarance']);
      });
      this.dialogRef.close();
    } else {
      this.toastr.success('Not Success', 'Error');
    }
  }
}
