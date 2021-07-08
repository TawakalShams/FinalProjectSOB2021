import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
// import { DecodedToken } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';

export interface DecodedToken {
  agentid?: string;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  agentid: any;
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public Data: any,
    private helper: JwtHelperService,
    private service: ServiceService,
    private router: Router,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);
    this.agentid = decodedToken.agentid;
  }

  ngOnInit(): void {
    // console.log(this.agentid);
    // console.log(this.Data);
  }
  myform = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });

  changePassword() {
    // console.log(this.myform.value);
    this.service
      .changePassword(this.agentid, this.myform.value)
      .pipe()
      .subscribe((data) => {
        this.toastr.success('Password has been changed', 'Successfully');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/']);
          });
        this.dialogRef.close();
      });
    // this.service
    //   .changePassword(this.id, this.myform.value)
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
  }
}
