import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor() { }

  form = new FormGroup({
    fname: new FormControl('',[
      Validators.required
    ]),
   

    gender: new FormControl('',[
      Validators.required
    ]),
    address: new FormControl('',[
      Validators.required
    ]),
    email: new FormControl('',[
      Validators.email
    ]),

    password: new FormControl('',[
      Validators.required
    ]),
    phone: new FormControl('',[
      Validators.required
    ]),
    cpassword: new FormControl('',[
      Validators.required
    ]),
  })

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.form.value)
  
    } 
}
