import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteAgentComponent } from './confirm-delete-agent.component';

describe('ConfirmDeleteAgentComponent', () => {
  let component: ConfirmDeleteAgentComponent;
  let fixture: ComponentFixture<ConfirmDeleteAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
