import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ImsModule } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  rows: any;
  constructor(public dialog: MatDialog, private service: ServiceService) { }
  form = new FormGroup({
      fname: new FormControl('',[
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
    // this.service.getSingleAgent().subscribe((data: ImsModule[] )=>
    // this.rows = data
    //)
  }
  update(){
    alert("Goo")
  }
}
