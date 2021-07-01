import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css'],
})
export class ReportTableComponent implements OnInit {
  payment: any;
  insuaredpayment: any;
  amount: any;
  sum: any;
  sum2: any;
  value: any;
  profiteLoss: any;

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service.viewPayment().subscribe((data: any) => {
      this.payment = data;
      this.sum = data.total_balance;
      console.log(data);
    });

    this.service.viewPayInsuard().subscribe((data: any) => {
      this.insuaredpayment = data;
      this.sum2 = data.total_balance;

      this.profiteLoss = this.sum - this.sum2;
    });
  }
}
