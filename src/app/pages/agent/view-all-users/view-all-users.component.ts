import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { AgentComponent } from 'src/app/dialog/agent/agent.component';
import { ConfirmDeleteAgentComponent } from 'src/app/dialog/confirm-delete-agent/confirm-delete-agent.component';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css'],
})
export class ViewAllUsersComponent implements OnInit {
  [x: string]: any;
  rows: any;
  filteredRows: any[] = [];
  temp = [];
  loading = true;
  lod: any;
  private updateSubscription: Subscription | undefined;

  @ViewChild('ngxDatatable')
  ngxDatatable!: DatatableComponent;

  columns = [
    { prop: 'No' },
    { name: 'fname' },
    { name: 'Email' },
    { name: 'Gender' },
    { name: 'Address' },
    { name: 'Phone' },
    { name: 'Branch' },
    { name: 'Actions' },
  ];
  @ViewChild(DatatableComponent)
  table!: DatatableComponent;

  ColumnMode = ColumnMode;
  mydata: any;
  agent: any;

  public getRowIndex(row: any): number {
    return this.table.bodyComponent.getRowIndex(row);
    // row being data object passed into the template
  }

  constructor(private service: ServiceService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.viewAgents();
  }

  viewAgents() {
    this.service.ViewUsers().subscribe((data: any) => {
      this.rows = data.agents;
      this.filteredRows = data.agents;
      this.loading = false;
    });
  }

  fetch(cb: any) {
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
      return d.email.toLowerCase().includes(val);
    });
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  delete(row: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteAgentComponent, {
      data: row,
    });
  }

  edit(row: any) {
    const dialogRef = this.dialog.open(AgentComponent, {
      data: row,
    });
  }

  // End
}
