import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  form = new FormGroup({
    platenumber: new FormControl('',[
      Validators.required
    ]),
   

    type: new FormControl('',[
      Validators.required
    ]),
   
  })
  onSubmit() {
    console.log(this.form.value)
  
    } 
}
