import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLinkWithHref } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  ColumnMode,
  DatatableComponent,
  sortRows,
} from '@swimlane/ngx-datatable';
// import { ConsoleReporter } from 'jasmine';
import { ConfirmDeletePaymentComponent } from 'src/app/dialog/confirm-delete-payment/confirm-delete-payment.component';
import { UpdateCustomerPaymentComponent } from 'src/app/dialog/update-customer-payment/update-customer-payment.component';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-customer-payments',
  templateUrl: './customer-payments.component.html',
  styleUrls: ['./customer-payments.component.css'],
})
export class CustomerPaymentsComponent implements OnInit {
  rows: any;
  filteredRows: any[] = [];
  temp = [];
  vehcle: String | undefined;
  fullName?: string;
  role?: string;
  loading = true;

  columns = [
    { prop: 'No' },
    { name: 'FullName' },
    { name: 'amount' },
    // { name: 'Actions' },
  ];
  @ViewChild(DatatableComponent)
  table!: DatatableComponent;

  ColumnMode = ColumnMode;
  mydata: any;
  constructor(
    private service: ServiceService,
    private http: HttpClient,
    public dialog: MatDialog,
    private helper: JwtHelperService
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);
    this.fullName = decodedToken.fullName;
    this.role = decodedToken.role;
  }

  ngOnInit(): void {
    this.service.viewPayment().subscribe((data: any) => {
      // console.log((this.rows = data.payment));
      this.rows = data.payment;
      this.filteredRows = data.payment;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    });
  }
  fetch(cb: any) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    // filter our data
    this.filteredRows = this.rows.filter(function (d: any) {
      return d.fullName.toLowerCase().includes(val);
    });
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  delete(rows: any) {
    // console.log(rows);
    // console.log((this.rows = rows.payment));
    const dialogRef = this.dialog.open(ConfirmDeletePaymentComponent, {
      data: rows,
    });
  }

  edit(row: any) {
    const dialogRef = this.dialog.open(UpdateCustomerPaymentComponent, {
      data: row,
    });
  }
}
