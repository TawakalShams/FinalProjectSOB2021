import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCustomerPaymentComponent } from './update-customer-payment.component';

describe('UpdateCustomerPaymentComponent', () => {
  let component: UpdateCustomerPaymentComponent;
  let fixture: ComponentFixture<UpdateCustomerPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCustomerPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCustomerPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
