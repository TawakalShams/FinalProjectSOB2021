import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInsuaranceComponent } from './view-insuarance.component';

describe('ViewInsuaranceComponent', () => {
  let component: ViewInsuaranceComponent;
  let fixture: ComponentFixture<ViewInsuaranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInsuaranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInsuaranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
