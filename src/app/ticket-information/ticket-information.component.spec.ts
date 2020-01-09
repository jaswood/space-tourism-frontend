import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TicketInformationComponent } from './ticket-information.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SpaceFlight } from 'src/models/spaceFlight';
import { Spaceship } from 'src/models/spaceship';

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

  let ships: Spaceship[] = [
    {
      nameCode: 'Falcon 9',
      shipId: 1,
      age: 0,
      maxSpeed: 0,
      noOfRows: 0,
      fuelCapacity: 0,
      totalSeats: 0
    },
    {
      nameCode: 'Falcon Heavy',
      shipId: 2,
      age: 0,
      maxSpeed: 0,
      noOfRows: 0,
      fuelCapacity: 0,
      totalSeats: 0
    }
  ]

  let flights: SpaceFlight[] = [
    {
      arrivalDate: new Date(Date.now()),
      departureDate: new Date(Date.now()),
      destination: 'Moon',
      flightNumber: 'Mun1',
      gate: 'A0',
      leavingLocation: 'Heathrow',
      ship: ships[0],
      availableSeats: 10
    },
    {
      arrivalDate: new Date(Date.now()),
      departureDate: new Date(Date.now()),
      destination: 'Mars',
      flightNumber: 'Mun2',
      gate: 'A0',
      leavingLocation: 'Heathrow',
      ship: ships[1],
      availableSeats: 10
    }
  ];

  //don't need lots of test cases, validators take care of that
  describe('firstNameOnKey Test', () => {
    it('should add inputed value to firstName parameter', () => {
      component.firstNameOnKey('a');
      expect(component.ticket.firstName).toEqual('a');
    });
  });
  describe('lastNameOnKey Test', () => {
    it('should add inputed value to lastName parameter', () => {
      component.lastNameOnKey('a');
      expect(component.ticket.lastName).toEqual('a');
    });
  });
  describe('passportNoOnKey Test', () => {
    it('should add inputed value to passportNumber parameter', () => {
      component.passportNoOnKey(1);
      expect(component.ticket.passportNumber).toEqual(1);
    });
  });
  describe('seatQuantityOnKey Test', () => {
    it('should add inputed value to seatQuantity parameter', () => {
      component.seatQuantityOnKey(1);
      expect(component.ticket.seatQuantity).toEqual(1);
    });
  });
  describe('emailAddressOnKey Test', () => {
    it('should add inputed value to emailAddress parameter', () => {
      component.emailAddressOnKey('a');
      expect(component.ticket.emailAddress).toEqual('a');
    });
  });
});
