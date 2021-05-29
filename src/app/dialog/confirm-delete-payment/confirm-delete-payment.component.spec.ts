import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeletePaymentComponent } from './confirm-delete-payment.component';

describe('ConfirmDeletePaymentComponent', () => {
  let component: ConfirmDeletePaymentComponent;
  let fixture: ComponentFixture<ConfirmDeletePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeletePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeletePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
