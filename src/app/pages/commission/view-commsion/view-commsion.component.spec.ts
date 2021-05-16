import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommsionComponent } from './view-commsion.component';

describe('ViewCommsionComponent', () => {
  let component: ViewCommsionComponent;
  let fixture: ComponentFixture<ViewCommsionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCommsionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCommsionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
