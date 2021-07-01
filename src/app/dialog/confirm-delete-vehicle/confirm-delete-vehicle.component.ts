import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service/service.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-confirm-delete-vehicle',
  templateUrl: './confirm-delete-vehicle.component.html',
  styleUrls: ['./confirm-delete-vehicle.component.css'],
})
export class ConfirmDeleteVehicleComponent implements OnInit {
  deteleData: any;
  platenumber: any;
  agentidi: any;
  @ViewChild('myTable') myTable: any;
  @ViewChild('ngxDatatable')
  ngxDatatable!: DatatableComponent;
  location: any;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public vehicles: any,
    private service: ServiceService,
    private toastr: ToastrService,
    private router: Router,
    private dialogRef: MatDialogRef<ConfirmDeleteVehicleComponent>
  ) {}

  ngOnInit(): void {
    // console.log(this.vehicles);
    console.log(this.vehicles);
  }

  vehicle(platenumber: any) {
    platenumber = this.vehicles;
    this.service.deletVehicle(platenumber).subscribe((data) => {
      this.deteleData = data;
      if (this.deteleData) {
        this.toastr.success('Successfully to Delete', 'Successfully');
        // this.router.navigateByUrl('/vehicle');
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['viewvehicle']);
          });
        // this.service.refresh();
        this.dialogRef.close({ platenumber });
      } else {
        this.toastr.error('Not Successfully to Delete', 'Error');
      }
    });
  }
}
