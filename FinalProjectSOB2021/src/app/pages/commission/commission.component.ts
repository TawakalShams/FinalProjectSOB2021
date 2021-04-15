import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.css']
})
export class CommissionComponent implements OnInit {

  constructor() { }

  form = new FormGroup({
    id: new FormControl('',[
      Validators.required
    ]),

    amount: new FormControl('',[
      Validators.required
    ]),
  })


ngOnInit(): void {
}
onSubmit() {
  console.log(this.form.value)

  } 
}
