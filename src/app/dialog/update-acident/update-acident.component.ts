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
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-update-acident',
  templateUrl: './update-acident.component.html',
  styleUrls: ['./update-acident.component.css'],
})
export class UpdateAcidentComponent implements OnInit {
  fullName: any;
  role: string | undefined;
  customerid: any;
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public Datas: any,
    private service: ServiceService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private helper: JwtHelperService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<UpdateAcidentComponent>
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);
    this.fullName = decodedToken.fullName;
    this.role = decodedToken.role;
  }

  form = new FormGroup({
    platenumber: new FormControl('', [Validators.required]),
    typeofacident: new FormControl('', [Validators.required]),
    policeReportNo: new FormControl('', [Validators.required]),
    create_by: new FormControl(),
  });

  ngOnInit(): void {
    // console.log(this.Datas);
    this.ViewSingVehicle();
    const customerid = this.Datas.customerid;
  }
  ViewSingVehicle() {
    this.service
      .getSingleAcident(this.Datas.vehicleid)
      .subscribe((data: any) => {
        const vehicles = data.vehicles;
        this.form.controls.platenumber.setValue(this.Datas.platenumber);
        this.form.controls.typeofacident.setValue(this.Datas.typeofacident);
        this.form.controls.policeReportNo.setValue(this.Datas.policeReportNo);
        this.form.updateValueAndValidity();
      });
  }
  update() {
    const updatae = this.service
      .updateAcident(this.Datas.acidentid, this.form.value)
      .subscribe((res) => {});
    if (updatae) {
      const acidentid = this.Datas.acidentid;
      this.toastr.success('Updated', 'Successfully');
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['accident']);
      });
      this.dialogRef.close({ acidentid });
    }
  }
}
