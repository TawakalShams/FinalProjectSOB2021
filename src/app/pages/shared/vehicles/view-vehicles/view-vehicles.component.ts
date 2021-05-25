import { Component, OnInit } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ServiceService } from 'src/app/service/service.service';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { ConfirmDeleteVehicleComponent } from 'src/app/dialog/confirm-delete-vehicle/confirm-delete-vehicle.component';
import { UpdateVehicleComponent } from 'src/app/dialog/update-vehicle/update-vehicle.component';

@Component({
  selector: 'app-view-vehicles',
  templateUrl: './view-vehicles.component.html',
  styleUrls: ['./view-vehicles.component.css']
})
export class ViewVehiclesComponent implements OnInit {
  [x: string]: any;
  rows: any;
  filteredRows: any[] = [];
  temp = [];
  fullName?: string;
  role?: string;

  columns = [{ prop: 'No' },{ name: 'Platenumber' },{ name: 'Type' }];

  ColumnMode = ColumnMode;
  mydata: any;
  agent:any;
      
  constructor(private service: ServiceService,
      public dialog: MatDialog,
      private helper: JwtHelperService,

    
    ) { 
        const token = localStorage.getItem('token');
        const decodedToken: DecodedToken = helper.decodeToken(token as string);
        this.fullName = decodedToken.fullName;
        this.role = decodedToken.role;
    }

  public getRowIndex(row: any): number {
      return this.table.bodyComponent.getRowIndex(row);   
      // row being data object passed into the template
  }
  
  ngOnInit(): void {
        this.service.viewVehicles().subscribe((data: any) => {
        this.rows = data.vehicles;
        this.filteredRows = data.vehicles;
      });

  }

     fetch(cb:any) {
      const req = new XMLHttpRequest();
      req.open('GET', `assets/data/company.json`);
      req.onload = () => {
        cb(JSON.parse(req.response));
      };
      req.send();
    }
    
    updateFilter(event: any) {
      const val = event.target.value.toLowerCase();
      // filter our data
      this.filteredRows = this.rows.filter(function (d: any) {
       return d.platenumber.toLowerCase().includes(val)
      });
    }

 deleteVehicle(row: any){
   
  const dialogRef = this.dialog.open(ConfirmDeleteVehicleComponent, {
    data: row
  });
    dialogRef.afterClosed().subscribe(({vehicleid}) => {
    this.filteredRows = this.filteredRows
    .filter(row => row.vehicleid !== vehicleid);
//  console.log(vehicleid)
  })
  // console.log(row)
}
edit(row: any){
  const dialogRef = this.dialog.open(UpdateVehicleComponent, {
    data: row
  });
}

}
