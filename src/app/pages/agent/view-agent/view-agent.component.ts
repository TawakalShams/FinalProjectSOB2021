import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AgentComponent } from 'src/app/dialog/agent/agent.component';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDeleteAgentComponent } from 'src/app/dialog/confirm-delete-agent/confirm-delete-agent.component';

@Component({
  selector: 'app-view-agent',
  templateUrl: './view-agent.component.html',
  styleUrls: ['./view-agent.component.css'],
})
export class ViewAgentComponent implements OnInit {
  [x: string]: any;
  rows: any;
  filteredRows: any[] = [];
  temp = [];
  loading = true;

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

  constructor(private service: ServiceService, public dialog: MatDialog) {
    // this.service.getSingleAgent
  }

  ngOnInit(): void {
    this.service.viewAgent().subscribe((data: any) => {
      this.rows = data.agents;
      this.filteredRows = data.agents;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
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

    dialogRef.afterClosed().subscribe(({ agentid }) => {
      this.filteredRows = this.filteredRows.filter(
        (row) => row.agentid !== agentid
      );
    });
  }

  edit(row: any) {
    const dialogRef = this.dialog.open(AgentComponent, {
      data: row,
    });

    dialogRef.afterClosed().subscribe(({ agent }) => {
      if (agent) {
        const index = this.filteredRows.findIndex(
          (ag) => ag.agentid === agent.agentid
        );

        const rows = this.filteredRows;
        rows[index] = agent;
        this.filteredRows = rows;
        console.log(this.filteredRows);
      }
    });
  }

  // End
}
