import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcidentComponent } from './acident.component';

describe('AcidentComponent', () => {
  let component: AcidentComponent;
  let fixture: ComponentFixture<AcidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
