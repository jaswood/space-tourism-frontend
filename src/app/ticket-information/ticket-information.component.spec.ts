import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TicketInformationComponent } from './ticket-information.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('TicketInformationComponent', () => {
  let component: TicketInformationComponent;
  let fixture: ComponentFixture<TicketInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketInformationComponent ],
      imports: [ ReactiveFormsModule, FormsModule,
        MatDatepickerModule,      
        MatNativeDateModule,
        HttpClientModule,
        RouterTestingModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
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
