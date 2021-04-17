import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import {MatTableDataSource} from '@angular/material/table';
//import { Component, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ImsModule } from '../../../module/ims/ims.module';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AgentComponent } from 'src/app/dialog/agent/agent.component';


@Component({
  selector: 'app-view-agent',
  templateUrl: './view-agent.component.html',
  styleUrls: ['./view-agent.component.css']
})
export class ViewAgentComponent implements OnInit {
  rows: any;
  temp = [];

  columns = [{ prop: 'No' },{ name: 'fname' }, { name: 'Email' }, { name: 'Gender' }, { name: 'Address' }, { name: 'Phone' }, { name: 'Branch' }, { name: 'Actions' }];
  @ViewChild(DatatableComponent)
  table!: DatatableComponent;

  ColumnMode = ColumnMode;
  mydata: any;

  public getRowIndex(row: any): number {
      return this.table.bodyComponent.getRowIndex(row);   // row being data object passed into the template
  }

  constructor(
      private service: ServiceService,
      private Http: HttpClient,
      private router: Router,
      public dialog: MatDialog
      ) { }

  ngOnInit(): void {
      this.service.viewAgent().subscribe((data: ImsModule[] )=>
        this.rows = data
      )

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
      const temp = this.temp.filter(function (d) {
        //return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        
      });
  
      // update the rows
      this.rows = temp;
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
    }

delete(agentId: any){
  console.log(agentId)
}
edit(){
  // alert("Edit is work")
  const dialogRef = this.dialog.open(AgentComponent);
  width: '250px'
  dialogRef.afterClosed().subscribe(result => {
    // console.log(`Dialog result: ${result}`);
  });
}


// End
}
