import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';


@Component({
  selector: 'app-agentregstration',
  templateUrl: './agentregstration.component.html',
  styleUrls: ['./agentregstration.component.css']
})
export class AgentregstrationComponent implements OnInit {
 
    emailParttern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\/[a-z]{2.4}$";

  constructor(
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router
  ) { }
    form = new FormGroup({
      fname: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl('',[
        Validators.email
      ]),
      password: new FormControl('',[
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
    })
 
  ngOnInit(): void {
  }
  onSubmit() {
    
    console.log(this.form.value)

    this.service.createAgent(this.form.value)
    .subscribe(data =>{
      this.router.navigate(['login'])
      if(this.service){
        this.toastr.success('Success to loggin!', 'Success!');
      }else{
        this.toastr.warning('Success to loggin!', 'Success!');
      }
    })
    } 
}
