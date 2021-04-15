import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ImsModule } from '../../../module/ims/ims.module';

@Component({
  selector: 'app-view-agent',
  templateUrl: './view-agent.component.html',
  styleUrls: ['./view-agent.component.css']
})
export class ViewAgentComponent implements OnInit {
  rows = [];

  temp = [];

  columns = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }];
  // @ViewChild(DatatableComponent) table: DatatableComponent;

  ColumnMode = ColumnMode;
  mydata: any;
 

  constructor(
      private service: ServiceService,
      private Http: HttpClient,
      
      ) { }

  ngOnInit(): void {
      this.service.viewAgent().subscribe((data: ImsModule[] )=>
        this.mydata = data
      )
    }
    
// End


}
