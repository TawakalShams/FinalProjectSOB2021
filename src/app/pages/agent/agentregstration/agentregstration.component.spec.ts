import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentregstrationComponent } from './agentregstration.component';

describe('AgentregstrationComponent', () => {
  let component: AgentregstrationComponent;
  let fixture: ComponentFixture<AgentregstrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentregstrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentregstrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
