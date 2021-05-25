import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from 'src/app/module/ims/ims.module';


@Component({
  selector: 'app-agentregstration',
  templateUrl: './agentregstration.component.html',
  styleUrls: ['./agentregstration.component.css']
})
export class AgentregstrationComponent implements OnInit {
submitted = false;
fullName?: string;


  constructor(
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router,
    private helper: JwtHelperService
  ) { 
        const token = localStorage.getItem('token');
        const decodedToken: DecodedToken = helper.decodeToken(token as string);

    this.fullName = decodedToken.fullName;
  }
    form = new FormGroup({
      fullName: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl('',[
        Validators.email
      ]),
      password: new FormControl('',[
        Validators.required
      ]),
      retypePassword: new FormControl('',[
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
      branch: new FormControl('',[
        Validators.required
      ]),
      phone: new FormControl('',[
        Validators.required
      ]),
       created_by: new FormControl(),
    })
 
  ngOnInit(): void {
  }
  onSubmit() {
    this.service.createAgent(this.form.value)
    .subscribe(res =>{
      this.submitted = true;
      this.toastr.success('Agent Successfully to Create', 'Successfully');
      this.router.navigateByUrl('/');
      // this.form.reset();
      
    }, 
      error =>{
        // console.log(error);
        this.toastr.error('Agent not Successfully to Create', 'Error');
      }
    )
    
    } 
}
