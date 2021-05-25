import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ImsModule } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
 rows: any;
  customerid : any;
  agentDat:any;
  agent = new ImsModule();
  fullName?: string;
  fullNameCreate?: string;
  role?: string;
  amount?: number;
 
  constructor(
            public dialog: MatDialog,
            @Inject(MAT_DIALOG_DATA) 
            public Datas: any,
               private service: ServiceService,
               private router:Router,
               private http: HttpClient,
               private route:ActivatedRoute,
                private helper: JwtHelperService,
                private toastr: ToastrService,
            private dialogRef: MatDialogRef<UpdateCustomerComponent>
                
                ) {
        const token = localStorage.getItem('token');
        const decodedToken: DecodedToken = helper.decodeToken(token as string);
        this.fullNameCreate = decodedToken.fullName;


   }

  
 
  form = new FormGroup({
    fullName: new FormControl('',[
        Validators.required
      ]),
    gender: new FormControl('',[
      Validators.required
    ]),
    dob: new FormControl('',[
      Validators.required
    ]),
    address: new FormControl('',[
      Validators.required
    ]),
    phone: new FormControl('',[
      Validators.required
    ]),
    
    vehicleid: new FormControl('',[
      Validators.required
    ]),
      created_by: new FormControl(),
  })
 actualAmount():void {
   
    }
  ngOnInit(): void {
         const fullName = this.fullName = this.Datas.fullName;
         const customerid = this.customerid = this.Datas.customerid;
    this.service.getSingleCustomer(this.Datas.customerid).subscribe((data: any) =>{
    this.form.controls.fullName.setValue(this.Datas.fullName);
    this.form.controls.gender.setValue(this.Datas.gender);
    this.form.controls.dob.setValue(this.Datas.dob);
    this.form.controls.address.setValue(this.Datas.address);
    this.form.controls.phone.setValue(this.Datas.phone);
    this.form.controls.vehicleid.setValue(this.Datas.vehicleid);
    })
  }

  payment(){
  this.service.createPayment(this.form.value)
    .subscribe(res =>{
      this.toastr.success('Successfully to pay', 'Successfully');
      this.router.navigateByUrl('/');
      this.form.reset();
     
      
    }, 
      error =>{
        this.toastr.error('Not Successfully', 'Error');
      }
    )
  }
  update(){
  const updatae = this.service.updateCustomer(this.Datas.customerid, this.form.value)
  .subscribe(res =>{
  })
    if(updatae){
       this.toastr.success('Updated', 'Successfully');
       const customerid = this.Datas.customerid
       this.dialogRef.close({customerid});
       this.router.navigateByUrl('customer');
    }
 
  }
}
