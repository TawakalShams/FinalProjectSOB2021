import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ImsModule } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrls: ['./customer-payment.component.css'],
})
export class CustomerPaymentComponent implements OnInit {
  rows: any;
  customerid: any;
  agentDat: any;
  agent = new ImsModule();
  fullName?: string;
  fullNameCreate?: string;
  role?: string;
  amount?: number = 50400;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public Datas: any,
    private service: ServiceService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private helper: JwtHelperService,
    private toastr: ToastrService
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);
    this.fullNameCreate = decodedToken.fullName;
  }

  form = new FormGroup({
    customerid: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    create_by: new FormControl(),
  });
  actualAmount(): void {}
  ngOnInit(): void {
    const fullName = (this.fullName = this.Datas.fullName);
    const customerid = (this.customerid = this.Datas.customerid);
    // console.log(this.Datas)
  }

  payment() {
    this.service.createPayment(this.form.value).subscribe(
      (res) => {
        if (res.error) {
          this.toastr.error(res.message, 'Error');
        } else {
          this.toastr.success('Successfully', 'Successfully');
          this.router.navigateByUrl('/');
        }
        // if (res) {
        //   this.toastr.error(res.message, 'Error');
        // } else {
        //   this.toastr.success('Successfully', 'success');
        // }
        // if (res) {
        //   this.toastr.success('Successfully', 'Successfully');
        //   this.router.navigateByUrl('/');
        //   console.log(res);
        // } else {
        //   this.toastr.error(
        //     `Amount is not correct either is maximum or minmum /
        //     Please check customer is already paid`,
        //     'Error'
        //   );
        // }
      }

      // (error) => {
      //   console.log(error);
      //   this.toastr.error(
      //     `Amount is not correct either is maximum or minmum /
      //   Please check customer is already paid`,
      //     'Error'
      //   );
      // }
    );

    // if (check) {
    //   this.toastr.success('Successfully', 'Successfully');
    //   this.router.navigateByUrl('/');
    //   this.form.reset();
    // } else {
    //   this.toastr.error(
    //     `Amount is not correct either is maximum or minmum /
    //     Please check customer is already paid`,
    //     'Error'
    //   );
    // }
  }
}
