import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-insurance-report',
  templateUrl: './insurance-report.component.html',
  styleUrls: ['./insurance-report.component.css'],
})
export class InsuranceReportComponent implements OnInit {
  color: any;
  platenumber: any;
  value: any;
  seat: any;
  manufacture: any;
  type: any;
  fullName: any;
  fullNameLogin: any;
  gender: any;
  dob: any;
  address: any;
  phone: any;
  date: any;
  startdate: any;
  enddate: any;
  created_at: any;
  max = 5000;
  randam: any;
  customerid: any;
  insuaranceid: any;
  customerData: any;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public Datas: any,
    private service: ServiceService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private helper: JwtHelperService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<InsuranceReportComponent>
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);
    this.fullNameLogin = decodedToken.fullName;
  }
  ngOnInit(): void {
    this.getsinglecustomer();
    const randam = (this.randam = Math.floor(Math.random() * this.max));
    this.vehicle();
  }

  vehicle() {
    const color = (this.color = this.Datas.color);
    const platenumber = (this.platenumber = this.Datas.platenumber);
    const value = (this.value = this.Datas.value);
    const seat = (this.seat = this.Datas.seat);
    const manufacture = (this.manufacture = this.Datas.manufacture);
    const type = (this.type = this.Datas.type);
    const fullName = (this.fullName = this.Datas.fullName);
    const gender = (this.gender = this.Datas.gender);
    const dob = (this.dob = this.Datas.dob);
    const address = (this.address = this.Datas.address);
    const phone = (this.phone = this.Datas.phone);
    const date = (this.date = this.Datas.date);
    const startdate = (this.startdate = this.Datas.startdate);
    const starenddatetdate = (this.enddate = this.Datas.enddate);
    const created_at = (this.created_at = this.Datas.created_at);
  }

  getsinglecustomer() {
    this.service
      .getSingleCustomerReport(this.Datas.vehicleid)
      .subscribe((data) => {
        // console.log(data);
        this.customerData = data;
        const fullName = (this.fullName = this.customerData.customers.fullName);
        // const value = (this.value = this.customerData.customers.value);
        const address = (this.address = this.customerData.customers.address);
        const gender = (this.gender = this.customerData.customers.gender);
        const dob = (this.dob = this.customerData.customers.dob);
        const phone = (this.phone = this.customerData.customers.phone);
      });
  }
}
