// import { Component, OnInit } from '@angular/core';
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
  selector: 'app-update-customer-payment',
  templateUrl: './update-customer-payment.component.html',
  styleUrls: ['./update-customer-payment.component.css'],
})
export class UpdateCustomerPaymentComponent implements OnInit {
  rows: any;
  agentid: any;
  Data: any;
  vehicles = new ImsModule();
  fullName?: string;
  role?: string;
  customerid: any;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public DATA: any,
    private service: ServiceService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private helper: JwtHelperService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<UpdateCustomerPaymentComponent>
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);
    this.fullName = decodedToken.fullName;
    this.role = decodedToken.role;
  }

  form = new FormGroup({
    // fullName: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    customerid: new FormControl('', [Validators.required]),
    create_by: new FormControl(),
  });
  ngOnInit(): void {
    const fullName = (this.fullName = this.DATA.fullName);
    const customerid = (this.customerid = this.DATA.customerid);

    this.ViewSingVehicle();
  }

  ViewSingVehicle() {
    this.service
      .getSinglePayment(this.DATA.paymentId)
      .subscribe((data: any) => {
        this.Data = data;
        this.vehicles = this.Data;
        const vehicles = data.payments;
        // this.form.controls.fullName.setValue(vehicles.customerid);
        this.form.controls.amount.setValue(vehicles.amount);

        this.form.updateValueAndValidity();
        // console.log(data);
      });
  }

  update() {
    const updatae = this.service
      .updatePayment(this.DATA.paymentId, this.form.value)
      .subscribe((res) => {});
    if (updatae) {
      this.toastr.success('Updated', 'Successfully');
      this.router.navigateByUrl('customer');
      this.dialogRef.close();
    } else {
      this.toastr.success('Not Success', 'Error');
    }
  }
}
