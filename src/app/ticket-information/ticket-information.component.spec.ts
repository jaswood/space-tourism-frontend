import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketInformationComponent } from './ticket-information.component';

describe('TicketInformationComponent', () => {
  let component: TicketInformationComponent;
  let fixture: ComponentFixture<TicketInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
