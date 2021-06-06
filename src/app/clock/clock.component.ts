import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
})
export class ClockComponent implements OnInit {
  date: Date | undefined;
  constructor() {}

  ngOnInit(): void {
    const intervalTimet = interval(1000);
    intervalTimet.subscribe(() => {
      this.date = new Date();
    });
  }
}
