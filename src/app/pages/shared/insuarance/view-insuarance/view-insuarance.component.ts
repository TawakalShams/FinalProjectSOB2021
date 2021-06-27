import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { ConfirmInsuaranceComponent } from 'src/app/dialog/confirm-insuarance/confirm-insuarance.component';
import { UpdateInsuranceComponent } from 'src/app/dialog/update-insurance/update-insurance.component';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { InsuranceReportComponent } from 'src/app/reports/insurance-report/insurance-report.component';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-view-insuarance',
  templateUrl: './view-insuarance.component.html',
  styleUrls: ['./view-insuarance.component.css'],
})
export class ViewInsuaranceComponent implements OnInit {
  rows: any;
  filteredRows: any[] = [];
  temp = [];
  vehcle: String | undefined;
  fullName?: string;
  role?: string;
  loading = true;

  columns = [
    { prop: 'No' },
    { name: 'vehicleid' },
    { name: 'color' },
    { name: 'seat' },
    { name: 'value' },
    { name: 'startdate' },
    { name: 'enddate' },
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
    this.service.viewInsuarance().subscribe((data: any) => {
      this.rows = data.insuarances;
      this.filteredRows = data.insuarance;
      this.loading = false;
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
      return d.platenumber.toLowerCase().includes(val);
    });
  }

  print(row: any) {
    const dialogRef = this.dialog.open(InsuranceReportComponent, {
      data: row,
    });
  }

  delete(row: any) {
    const dialogRef = this.dialog.open(ConfirmInsuaranceComponent, {
      data: row,
    });
  }

  edit(row: any) {
    const dialogRef = this.dialog.open(UpdateInsuranceComponent, {
      data: row,
    });
    // console.log(row);
  }
}
