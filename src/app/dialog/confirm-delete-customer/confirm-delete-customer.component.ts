import { Component, Inject, OnInit, ViewChild,   } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-delete-customer',
  templateUrl: './confirm-delete-customer.component.html',
  styleUrls: ['./confirm-delete-customer.component.css']
})
export class ConfirmDeleteCustomerComponent implements OnInit {
  
  deteleData: any;
  agentid: any;
  agentidi:any
   @ViewChild('myTable') myTable:any;
  @ViewChild('ngxDatatable')
   ngxDatatable!: DatatableComponent;

  constructor(
           @Inject(MAT_DIALOG_DATA) public data: any,
            public dialog: MatDialog,
            private service: ServiceService,
            private toastr: ToastrService,
            private router: Router,
            private dialogRef: MatDialogRef<ConfirmDeleteCustomerComponent>
           
            ) { }


  ngOnInit(): void {
    // console.log(this.data)
  }

  yes(customerid:any){
      customerid = this.data
      this.service.deleteCustomer(customerid).subscribe(data =>{
      this.deteleData = data;
      // console.log(this.deteleData)
      if( this.deteleData){
        this.toastr.success('Customer Successfully to Delete', 'Successfully');
        this.router.navigateByUrl('/customer');
        this.dialogRef.close({ customerid });

      }else{
        this.toastr.error('Customer not Successfully to Delete', 'Error');
      }
    
  })
  }
}
function MD_DIALOG_DATA(MD_DIALOG_DATA: any) {
  throw new Error('Function not implemented.');
}

