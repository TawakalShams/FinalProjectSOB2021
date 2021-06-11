import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAcidentComponent } from './view-acident.component';

describe('ViewAcidentComponent', () => {
  let component: ViewAcidentComponent;
  let fixture: ComponentFixture<ViewAcidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAcidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAcidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
