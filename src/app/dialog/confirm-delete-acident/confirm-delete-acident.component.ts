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
  selector: 'app-confirm-delete-acident',
  templateUrl: './confirm-delete-acident.component.html',
  styleUrls: ['./confirm-delete-acident.component.css'],
})
export class ConfirmDeleteAcidentComponent implements OnInit {
  deteleData: any;
  acidentid: any;
  agentidi: any;
  @ViewChild('myTable') myTable: any;
  @ViewChild('ngxDatatable')
  ngxDatatable!: DatatableComponent;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public Dataa: any,
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router,
    private dialogRef: MatDialogRef<ConfirmDeleteAcidentComponent>
  ) {}

  ngOnInit(): void {
    // console.log(this.agentData)
  }

  yes(acidentid: any) {
    acidentid = this.Dataa;
    this.service.deleteAcident(acidentid).subscribe((data) => {
      this.deteleData = data;
      if (this.deteleData) {
        this.toastr.success('Successfully to Delete', 'Successfully');
        this.router.navigateByUrl('/acident');
        this.dialogRef.close({ acidentid });
      } else {
        this.toastr.error('Successfully to Delete', 'Error');
      }
    });
  }
}
