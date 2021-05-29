import { Inject, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-confirm-delete-payment',
  templateUrl: './confirm-delete-payment.component.html',
  styleUrls: ['./confirm-delete-payment.component.css'],
})
export class ConfirmDeletePaymentComponent implements OnInit {
  deteleData: any;
  paymentId: any;
  agentidi: any;
  @ViewChild('myTable') myTable: any;
  @ViewChild('ngxDatatable')
  ngxDatatable!: DatatableComponent;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public agentData: any,
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router,
    private dialogRef: MatDialogRef<ConfirmDeletePaymentComponent>
  ) {}

  ngOnInit(): void {
    // console.log(this.agentData)
  }

  yes(paymentId: any) {
    paymentId = this.agentData;
    this.service.deletePayment(paymentId).subscribe((data) => {
      this.deteleData = data;
      if (this.deteleData) {
        this.toastr.success(' Successfully to Delete', 'Successfully');
        this.router.navigateByUrl('/customer');
        this.dialogRef.close({ paymentId });
      } else {
        this.toastr.error('Not Successfully to Delete', 'Error');
      }
    });
  }
}
