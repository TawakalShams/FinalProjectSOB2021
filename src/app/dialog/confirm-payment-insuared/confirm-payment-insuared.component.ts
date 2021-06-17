import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { DecodedToken, ImsModule } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-confirm-payment-insuared',
  templateUrl: './confirm-payment-insuared.component.html',
  styleUrls: ['./confirm-payment-insuared.component.css'],
})
export class ConfirmPaymentInsuaredComponent implements OnInit {
  rows: any;
  insuaranceid: any;
  agentDat: any;
  agent = new ImsModule();
  platenumber?: string;
  fullNameCreate?: string;
  role?: string;
  amount?: number = 50400;
  fullName: any;
  phone: any;

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
    insuaranceid: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    create_by: new FormControl(),
  });
  actualAmount(): void {}
  ngOnInit(): void {
    const platenumber = (this.platenumber = this.Datas.platenumber);
    const insuaranceid = (this.insuaranceid = this.Datas.insuaranceid);
    const fullName = (this.fullName = this.Datas.fullName);
    const phone = (this.phone = this.Datas.phone);
  }

  payment() {
    this.service.createPayInsuard(this.form.value).subscribe((res) => {
      if (res.error) {
        this.toastr.error(res.message, 'Error');
      } else {
        this.toastr.success('Successfully', 'Successfully');
        this.router
          .navigateByUrl('/', {
            skipLocationChange: true,
          })
          .then(() => {
            this.router.navigate(['viewacident']);
          });
      }
    });
  }
}
