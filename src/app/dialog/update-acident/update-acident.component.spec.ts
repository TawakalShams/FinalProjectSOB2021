import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAcidentComponent } from './update-acident.component';

describe('UpdateAcidentComponent', () => {
  let component: UpdateAcidentComponent;
  let fixture: ComponentFixture<UpdateAcidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAcidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAcidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
