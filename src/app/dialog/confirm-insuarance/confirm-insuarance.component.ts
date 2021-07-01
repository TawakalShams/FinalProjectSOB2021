import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-confirm-insuarance',
  templateUrl: './confirm-insuarance.component.html',
  styleUrls: ['./confirm-insuarance.component.css'],
})
export class ConfirmInsuaranceComponent implements OnInit {
  deteleData: any;
  insuaranceid: any;
  agentidi: any;
  @ViewChild('myTable') myTable: any;
  @ViewChild('ngxDatatable')
  ngxDatatable!: DatatableComponent;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public DATA: any,
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router,
    private dialogRef: MatDialogRef<ConfirmInsuaranceComponent>
  ) {}

  ngOnInit(): void {
    // console.log('DATS' + this.DATA);
  }

  yes(insuaranceid: any) {
    insuaranceid = this.DATA;
    this.service.deleteInsuarance(insuaranceid).subscribe((data) => {
      // console.log('DATS' + this.DATA);
      this.deteleData = data;
      if (this.deteleData) {
        this.toastr.success('Successfully to Delete', 'Successfully');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['viewinsuarance']);
          });
        this.dialogRef.close({ insuaranceid });
      } else {
        this.toastr.error('Not Successfully to Delete', 'Error');
      }
    });
  }
}
