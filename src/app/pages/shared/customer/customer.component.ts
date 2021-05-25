import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
fullName?: string;
role?: string;
submitted = false;
vehcle: String | undefined;
platenumber: String | undefined;

  constructor(
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router,
    private helper: JwtHelperService
  ) {
        const token = localStorage.getItem('token');
        const decodedToken: DecodedToken = helper.decodeToken(token as string);
        this.fullName = decodedToken.fullName;
        this.role = decodedToken.role;

 
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


ngOnInit(): void {
        this.service.viewVehicles().subscribe((data: any) =>{
        this.vehcle = data;
        console.log(data)
      });
      

}
onSubmit() {
    this.service.createCustomer(this.form.value)
    .subscribe(res =>{
      this.submitted = true;
      this.toastr.success('Customer Successfully to Create', 'Successfully');
      this.router.navigateByUrl('/');
      this.form.reset();
    }, 
      error =>{
        console.log(error);
        this.toastr.error('Customer not Successfully to Create', 'Error');
      }
    )
  } 
}
