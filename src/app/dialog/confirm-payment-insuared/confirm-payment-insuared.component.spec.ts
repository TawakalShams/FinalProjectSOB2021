import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPaymentInsuaredComponent } from './confirm-payment-insuared.component';

describe('ConfirmPaymentInsuaredComponent', () => {
  let component: ConfirmPaymentInsuaredComponent;
  let fixture: ComponentFixture<ConfirmPaymentInsuaredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPaymentInsuaredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPaymentInsuaredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
