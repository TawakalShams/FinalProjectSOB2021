import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-confirm-delete-agent',
  templateUrl: './confirm-delete-agent.component.html',
  styleUrls: ['./confirm-delete-agent.component.css'],
})
export class ConfirmDeleteAgentComponent implements OnInit {
  deteleData: any;
  agentid: any;
  agentidi: any;
  @ViewChild('myTable') myTable: any;
  @ViewChild('ngxDatatable')
  ngxDatatable!: DatatableComponent;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public agentData: any,
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router,
    private dialogRef: MatDialogRef<ConfirmDeleteAgentComponent>
  ) {}

  ngOnInit(): void {
    // console.log(this.agentData)
  }

  yes(agentid: any) {
    agentid = this.agentData;
    this.service.deleteAgent(agentid).subscribe((data) => {
      this.deteleData = data;
      if (this.deteleData) {
        this.toastr.success('Agent Successfully to Delete', 'Successfully');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['viewagent']);
          });
        this.dialogRef.close({ agentid });
      } else {
        this.toastr.error('Agent not Successfully to Delete', 'Error');
      }
    });
  }
}
