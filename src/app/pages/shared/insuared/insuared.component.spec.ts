import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuaredComponent } from './insuared.component';

describe('InsuaredComponent', () => {
  let component: InsuaredComponent;
  let fixture: ComponentFixture<InsuaredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuaredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuaredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
