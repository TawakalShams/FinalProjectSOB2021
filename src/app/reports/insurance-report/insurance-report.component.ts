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
  yearOfManufacture: any;
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
  model: any;
  chassiNumber: any;
  typeOfInsuarance: any;
  fullNameCustomer: any;
  amount: any;

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
    // this.getsinglecustomer();
    const randam = (this.randam = Math.floor(Math.random() * this.max));
    this.getSingleInsuarance();
    // console.log(this.Datas);
  }

  getSingleInsuarance() {
    const color = (this.color = this.Datas.insuarance.color);
    const platenumber = (this.platenumber = this.Datas.insuarance.platenumber);
    const value = (this.value = this.Datas.insuarance.value);
    const seat = (this.seat = this.Datas.insuarance.seat);
    const manufacture = (this.yearOfManufacture =
      this.Datas.insuarance.yearOfManufacture);
    const type = (this.type = this.Datas.insuarance.type);
    const fullName = (this.fullName = this.Datas.insuarance.fullName);
    const gender = (this.gender = this.Datas.insuarance.gender);
    const dob = (this.dob = this.Datas.insuarance.dob);
    const status = (this.amount = this.Datas.amount);

    const address = (this.address = this.Datas.insuarance.address);
    const phone = (this.phone = this.Datas.insuarance.phone);
    const date = (this.date = this.Datas.insuarance.date);
    const model = (this.model = this.Datas.insuarance.model);
    const chassiNumber = (this.chassiNumber =
      this.Datas.insuarance.chassiNumber);
    const startdate = (this.startdate = this.Datas.insuarance.startdate);
    const typeOfInsuarance = (this.typeOfInsuarance =
      this.Datas.insuarance.typeOfInsuarance);
    const starenddatetdate = (this.enddate = this.Datas.insuarance.enddate);
    const created_at = (this.created_at = this.Datas.insuarance.create_at);
  }

  // getsinglecustomer() {
  //   this.service
  //     .getSingleCustomerReport(this.Datas.vehicleid)
  //     .subscribe((data) => {
  //       console.log(data);
  //       this.customerData = data;
  //       // const fullName = (this.fullName = this.customerData.customers.fullName);
  //       // const value = (this.value = this.customerData.customers.value);
  //       const address = (this.address = this.customerData.customers.address);
  //       const gender = (this.gender = this.customerData.customers.gender);
  //       const dob = (this.dob = this.customerData.customers.dob);
  //       const phone = (this.phone = this.customerData.customers.phone);
  //     });
  // }
}
