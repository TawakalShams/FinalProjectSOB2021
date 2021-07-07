import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ConfirmDeleteAcidentComponent } from 'src/app/dialog/confirm-delete-acident/confirm-delete-acident.component';
import { ConfirmPaymentInsuaredComponent } from 'src/app/dialog/confirm-payment-insuared/confirm-payment-insuared.component';
import { UpdateAcidentComponent } from 'src/app/dialog/update-acident/update-acident.component';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-view-acident',
  templateUrl: './view-acident.component.html',
  styleUrls: ['./view-acident.component.css'],
})
export class ViewAcidentComponent implements OnInit {
  [x: string]: any;
  rows: any;
  filteredRows: any[] = [];
  temp = [];
  fullName?: string;
  role?: string;
  loading = true;

  columns = [{ prop: 'No' }, { name: 'Platenumber' }, { name: 'Type' }];

  ColumnMode = ColumnMode;
  mydata: any;
  agent: any;

  constructor(
    private service: ServiceService,
    public dialog: MatDialog,
    private helper: JwtHelperService
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);
    this.fullName = decodedToken.fullName;
    this.role = decodedToken.role;
  }

  public getRowIndex(row: any): number {
    return this.table.bodyComponent.getRowIndex(row);
    // row being data object passed into the template
  }

  ngOnInit(): void {
    this.service.viewAcident().subscribe((data: any) => {
      this.rows = data;
      this.filteredRows = data;
      this.loading = false;
      // console.log(data);
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
  payment(row: any) {
    const dialogRef = this.dialog.open(ConfirmPaymentInsuaredComponent, {
      data: row,
    });
  }

  deleteAcident(row: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteAcidentComponent, {
      data: row,
    });
    console.log(row);
  }
  edit(row: any) {
    const dialogRef = this.dialog.open(UpdateAcidentComponent, {
      data: row,
    });
  }
}
