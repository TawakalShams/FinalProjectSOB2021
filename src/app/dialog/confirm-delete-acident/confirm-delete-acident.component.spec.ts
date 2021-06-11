import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteAcidentComponent } from './confirm-delete-acident.component';

describe('ConfirmDeleteAcidentComponent', () => {
  let component: ConfirmDeleteAcidentComponent;
  let fixture: ComponentFixture<ConfirmDeleteAcidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteAcidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteAcidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
