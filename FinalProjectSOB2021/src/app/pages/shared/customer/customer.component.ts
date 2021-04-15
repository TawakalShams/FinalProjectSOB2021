import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor() { }

  form = new FormGroup({
    fname: new FormControl('',[
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
  })


ngOnInit(): void {
}
onSubmit() {
  console.log(this.form.value)

  } 
}
