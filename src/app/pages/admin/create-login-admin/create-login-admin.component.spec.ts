import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoginAdminComponent } from './create-login-admin.component';

describe('CreateLoginAdminComponent', () => {
  let component: CreateLoginAdminComponent;
  let fixture: ComponentFixture<CreateLoginAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLoginAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLoginAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
