import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmInsuaranceComponent } from './confirm-insuarance.component';

describe('ConfirmInsuaranceComponent', () => {
  let component: ConfirmInsuaranceComponent;
  let fixture: ComponentFixture<ConfirmInsuaranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmInsuaranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmInsuaranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
