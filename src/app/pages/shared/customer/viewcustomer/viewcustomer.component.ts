import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ConfirmDeleteCustomerComponent } from 'src/app/dialog/confirm-delete-customer/confirm-delete-customer.component';
import { CustomerPaymentComponent } from 'src/app/dialog/customer-payment/customer-payment.component';
import { UpdateCustomerComponent } from 'src/app/dialog/update-customer/update-customer.component';
import { DecodedToken, ImsModule } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.css'],
})
export class ViewcustomerComponent implements OnInit {
  rows: any;
  filteredRows: any[] = [];
  temp = [];
  vehcle: String | undefined;
  fullName?: string;
  role?: string;
  loading = true;
  allStatus: string | undefined;
  customerData: any;
  typeOfInsuarance: any;

  columns = [
    { prop: 'No' },
    { name: 'fullName' },
    { name: 'Gender' },
    { name: 'Address' },
    { name: 'Phone' },
    { name: 'Type' },
    { name: 'Actions' },
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
    this.service.viewCustomers().subscribe((data: any) => {
      this.rows = data;
      this.filteredRows = data;

      // const fullName = (this.fullName = this.customerData.customers.fullName);
      this.loading = false;
      // console.log(data);
    });
    this.status();

    // console.log(this.rows);
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
  status() {
    this.service.viewPayment().subscribe((data: any) => {
      const mystatus: any[] = data.payment;

      const allStatus = mystatus.map((item) => item.status);

      // console.log(mystatus);
      // console.log(allStatus);
    });
  }
  payment(row: any) {
    const dialogRef = this.dialog.open(CustomerPaymentComponent, {
      data: row,
    });
  }

  delete(row: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteCustomerComponent, {
      data: row,
    });
    // dialogRef.afterClosed().subscribe((customerid) => {
    //   console.log(customerid);
    //   this.filteredRows = this.filteredRows.filter(
    //     //delete auto removed
    //     (row) => row.customerid !== customerid
    //   );
    // });
  }

  edit(row: any) {
    const dialogRef = this.dialog.open(UpdateCustomerComponent, {
      data: row,
    });
  }
}
