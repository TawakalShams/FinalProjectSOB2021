import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Key } from 'protractor';
import { ImsModule } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  rows: any;
  agentid: any;
  agentDat:any;
  agent = new ImsModule();
  
  constructor(public dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public agentData: any,
               private service: ServiceService,
               private router:Router,
               private http: HttpClient,
               private route:ActivatedRoute) {

   }

  form = new FormGroup({
    fullName: new FormControl('',[
        Validators.required
      ]),
    email: new FormControl('',[
      Validators.required
    ]),
    password: new FormControl('',[
      Validators.required
    ]),
    address: new FormControl('',[
      Validators.required
    ]),
    branch: new FormControl('',[
      Validators.required
    ]),
    dob: new FormControl('',[
      Validators.required
    ]),
    phone: new FormControl('',[
      Validators.required
    ]),
    gender: new FormControl('',[
      Validators.required
    ])

  })
  ngOnInit(): void {
      this.ViewSingAgent();
  }
  ViewSingAgent(){
      this.service.getSingleAgent(this.agentData.agentid).subscribe((data: any) =>{
        this.agentDat = data
        this.agent = this.agentDat;
      
        const agent = data.agents;
        this.form.controls.fullName.setValue(agent.fullName);
        this.form.controls.email.setValue(agent.email);
        this.form.controls.password.setValue(agent.password);
        this.form.controls.address.setValue(agent.address);
        this.form.controls.branch.setValue(agent.branch);
        this.form.controls.dob.setValue(agent.dob);
        this.form.controls.phone.setValue(agent.phone);
        this.form.controls.gender.setValue(agent.gender);
        this.form.updateValueAndValidity();
    })

  }
  update(){
    alert("Goo")
  }
}
