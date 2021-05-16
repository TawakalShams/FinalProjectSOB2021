import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ImsModule } from 'src/app/module/ims/ims.module';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.css']
})
export class ViewcustomerComponent implements OnInit {
  rows: any;
  filteredRows: any[] = [];
  temp = [];

columns = [{ prop: 'No' },{ name: 'fname' }, { name: 'Email' }, { name: 'Gender' }, { name: 'Address' }, { name: 'Phone' }, { name: 'Branch' }, { name: 'Actions' }];
  @ViewChild(DatatableComponent)
  table!: DatatableComponent;

  ColumnMode = ColumnMode;
  mydata: any;
  constructor(
    private service: ServiceService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.service.viewCustomers().subscribe((data: ImsModule[] ) => {
      this.rows = data;
      this.filteredRows = data
    }
      
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
    this.filteredRows = this.rows.filter(function (d: any) {
      
     return d.fname.toLowerCase().includes(val)
      
    });
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}
