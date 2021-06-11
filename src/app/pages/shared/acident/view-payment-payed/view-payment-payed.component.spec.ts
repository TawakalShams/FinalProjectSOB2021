import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaymentPayedComponent } from './view-payment-payed.component';

describe('ViewPaymentPayedComponent', () => {
  let component: ViewPaymentPayedComponent;
  let fixture: ComponentFixture<ViewPaymentPayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPaymentPayedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPaymentPayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
