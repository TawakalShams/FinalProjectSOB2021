import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuaranceComponent } from './insuarance.component';

describe('InsuaranceComponent', () => {
  let component: InsuaranceComponent;
  let fixture: ComponentFixture<InsuaranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuaranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuaranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
