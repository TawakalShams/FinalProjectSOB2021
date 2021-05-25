import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


export interface DecodedToken {
  fullName?: string;
  role?: string;
  email?: string;
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})


export class ImsModule {
  customerid(customerid: any) {
    throw new Error('Method not implemented.');
  } 

  fullName:string | undefined ;
  email:any;
  password:any;
  gender:any;
  address:any;
  branch:any;
  dob:any;
  phone:any;
  platenumber:any;

}
