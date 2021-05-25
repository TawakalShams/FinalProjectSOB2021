import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ImsModule } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
 rows: any;
  agentid: any;
  agentDat:any;
  agent = new ImsModule();
  fullName?: string;
  role?: string;
 
  constructor(public dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public agentData: any,
               private service: ServiceService,
               private router:Router,
               private http: HttpClient,
               private route:ActivatedRoute,
                private helper: JwtHelperService,
                private toastr: ToastrService,) {
        const token = localStorage.getItem('token');
        const decodedToken: DecodedToken = helper.decodeToken(token as string);
        this.fullName = decodedToken.fullName;
        this.role = decodedToken.role;
   }

  ngOnInit(): void {
  }


}