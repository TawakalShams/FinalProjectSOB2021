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
  paymentid: any;
  customerid: any;
  @ViewChild('myTable') myTable: any;
  @ViewChild('ngxDatatable')
  ngxDatatable!: DatatableComponent;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public Datas: any,
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router,
    private dialogRef: MatDialogRef<ConfirmDeletePaymentComponent>
  ) {}

  ngOnInit(): void {
    // console.log(this.agentData)
    // console.log('Datas' + this.Datas);
  }

  yes(paymentid: any) {
    paymentid = this.Datas;
    console.log(this.Datas);
    this.service.deletePayment(paymentid).subscribe((data) => {
      console.log(data);
      this.deteleData = this.Datas;
      if (this.deteleData) {
        this.toastr.success(' Successfully to Delete', 'Successfully');
        this.router
          .navigateByUrl('/', {
            skipLocationChange: true,
          })
          .then(() => {
            this.router.navigate(['viewcustomerpayment']);
          });
        this.dialogRef.close({ paymentid });
      } else {
        this.toastr.error('Not Successfully to Delete', 'Error');
      }
    });
  }
}
