import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-mandotory',
  templateUrl: './mandotory.component.html',
  styleUrls: ['./mandotory.component.css'],
})
export class MandotoryComponent implements OnInit {
  create_by: any;
  typeOfInsuarance?: string;
  value?: number;
  fullName?: string;
  insuaranceid?: any;
  pay?: String;
  vat?: any;
  rate?: any;
  cal?: any;
  type?: any;
  amount?: any;

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
    this.create_by = decodedToken.fullName;
  }

  ngOnInit(): void {
    // console.log('This' + this.vat);
    this.calc();

    const fullName = (this.fullName = this.Datas.fullName);

    const amount = (this.amount = this.Datas.value);
    const customerid = (this.insuaranceid = this.Datas.insuaranceid);
    const typeOfInsuarance = (this.typeOfInsuarance =
      this.Datas.typeOfInsuarance);
    const type = (this.type = this.Datas.type);

    const cal = (this.cal = this.vat);
  }

  form = new FormGroup({
    insuaranceid: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    // values: new FormControl('', [Validators.required]),
    create_by: new FormControl(),
  });

  calc() {
    const value = (this.value =
      this.Datas.value * (this.vat / 100) +
      this.Datas.value * (this.rate / 100));
  }

  payment() {
    this.service.createPayment(this.form.value).subscribe((res) => {
      if (res.error) {
        this.toastr.error(res.message, 'Error');
      } else {
        this.toastr.success('Successfully', 'Successfully');
        this.router
          .navigateByUrl('/', {
            skipLocationChange: true,
          })
          .then(() => {
            this.router.navigate(['viewcustomerpayment']);
          });
      }
    });
  }
}
