import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandotoryComponent } from './mandotory.component';

describe('MandotoryComponent', () => {
  let component: MandotoryComponent;
  let fixture: ComponentFixture<MandotoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandotoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandotoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
