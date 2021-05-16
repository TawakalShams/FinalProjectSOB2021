import { Component, Inject, OnInit, ViewChild } from '@angular/core';
// import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-confirm-delete-agent',
  templateUrl: './confirm-delete-agent.component.html',
  styleUrls: ['./confirm-delete-agent.component.css']
})
export class ConfirmDeleteAgentComponent implements OnInit {
  deteleData: any;
  agentid: any;
  agentidi:any;
  @ViewChild('myTable') myTable:any;
  @ViewChild('ngxDatatable')
  ngxDatatable!: DatatableComponent;

  constructor(public dialog: MatDialog,
             @Inject(MAT_DIALOG_DATA) public agentData: any,
            
            private service: ServiceService,
            private toastr: ToastrService,
            private router: Router,
           
            ) { }

  ngOnInit(): void {
    // console.log(this.agentData)
  }

  yes(agentid:any){
      agentid = this.agentData
      this.service.deleteAgent(agentid).subscribe(data =>{
      this.deteleData = data;
      if( this.deteleData){
        this.toastr.success('Agent Successfully to Delete', 'Successfully');
      //  setTimeout(() =>{
      //    this.ngxDatatable.element.click();
      //  },500)
         
        this.router.navigateByUrl('/agent');
      }else{
        this.toastr.error('Agent not Successfully to Delete', 'Error');
      }
    
  })
  }
}
