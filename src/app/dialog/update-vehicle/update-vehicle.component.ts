import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { DecodedToken, ImsModule } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css'],
})
export class UpdateVehicleComponent implements OnInit {
  rows: any;
  agentid: any;
  Data: any;
  vehicles = new ImsModule();
  fullName?: string;
  role?: string;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public DATA: any,
    private service: ServiceService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private helper: JwtHelperService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<UpdateVehicleComponent>
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);
    this.fullName = decodedToken.fullName;
    this.role = decodedToken.role;
  }

  form = new FormGroup({
    platenumber: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),

    created_by: new FormControl(),
  });
  ngOnInit(): void {
    this.ViewSingVehicle();
  }

  ViewSingVehicle() {
    this.service
      .getSingleVehicle(this.DATA.vehicleid)
      .subscribe((data: any) => {
        this.Data = data;
        this.vehicles = this.Data;
        const vehicles = data.vehicles;
        this.form.controls.platenumber.setValue(vehicles.platenumber);
        this.form.controls.type.setValue(vehicles.type);

        this.form.updateValueAndValidity();
      });
  }

  update() {
    const updatae = this.service
      .updateVehicle(this.DATA.vehicleid, this.form.value)
      .subscribe((res) => {});
    if (updatae) {
      this.toastr.success('Updated', 'Successfully');
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['viewvehicle']);
      });
      this.dialogRef.close();
    }
  }
}
