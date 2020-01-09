import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SeatSelectionComponent } from './seat-selection.component';
import { SeatsService } from './services/seats.service';
import { MockSeatService } from '../../mocks/MockSeatService';
import { SpaceFlight } from 'src/models/spaceFlight';
import { Spaceship } from 'src/models/spaceship';
import { Ticket } from 'src/models/ticket';
import { Seat } from 'src/models/seat';
import { RouterTestingModule } from '@angular/router/testing';
import { SeatColumn } from 'src/models/seatColumn';

describe('SeatSelectionComponent', () => {
  let component: SeatSelectionComponent;
  let fixture: ComponentFixture<SeatSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeatSelectionComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: SeatsService, useClass: MockSeatService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    })
      .compileComponents();
  }));

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

  let ticket: Ticket = {
    dob: new Date(Date.now()),
    firstName: 'Joe',
    lastName: 'Bloggs',
    passportNumber: 1234,
    seatQuantity: 3,
    emailAddress: 'joe.bloggs@gmail.com',
    flightNumber: 'Mun2',
    spaceFlight: flights[1],
    seats: [],
    ticketNumber: ''
  }

  let seat1: Seat = {
    seatCode: 'A',
    seatNo: 0
  }

  let seat2: Seat = {
    seatNo: 0,
    seatCode: 'B'
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ticket = new Ticket();
    component.ticket = ticket;
  });


  describe('calculateNumberOfColumns Tests', () => {
    const testCases = [
      { seats: 20, expect: 4 },
      { seats: 50, expect: 10 },
      { seats: 0, expect: 0 },
      { seats: -1, expect: 0 }
    ];

    testCases.forEach((test, index) => {
      it(`calculateNumberOfColumns with seats ${test.seats} correctly, expecting ${test.expect} (testCase: ${index + 1})`, () => {
        ticket.spaceFlight.ship.totalSeats = test.seats;
        component.ticket = ticket;
        expect(component.calculateNumberOfColumns()).toEqual(test.expect);
      });
    });
  });

  describe('generateSeatCodeLetter Tests', () => {
    const testCases = [
      { seatNo: 0, expect: 'A' },
      { seatNo: 1, expect: 'B' },
      { seatNo: 2, expect: 'C' },
      { seatNo: 3, expect: 'D' },
      { seatNo: 4, expect: 'E' },
      { seatNo: 5, expect: '' },
      { seatNo: -1, expect: '' },
    ];
    testCases.forEach((test, index) => {
      it(`generateSeatCode with Seat Number ${test.seatNo} correctly, expecting ${test.expect} (testCase: ${index + 1})`, () => {
        expect(component.generateSeatCodeLetter(test.seatNo)).toEqual(test.expect);
      });
    })
  });

  describe('generateSeatCodeNumber Tests', () => {
    const testCases = [
      { expect: 0, seatLetter: 'A' },
      { expect: 1, seatLetter: 'B' },
      { expect: 2, seatLetter: 'C' },
      { expect: 3, seatLetter: 'D' },
      { expect: 4, seatLetter: 'E' },
    ];
    testCases.forEach((test, index) => {
      it(`generateSeatCode with Seat Number ${test.seatLetter} correctly, expecting ${test.expect} (testCase: ${index + 1})`, () => {
        expect(component.generateSeatCodeNumber(test.seatLetter)).toEqual(test.expect);
      });
    })
  });

  describe('setSeatColor Tests', () => {
    const testCases = [
      { colour: 'green', columnInTestModel: 0, rowInTestModel: 0, expect: 'green' },
      { colour: 'red', columnInTestModel: 0, rowInTestModel: 0, expect: 'red' }
    ];

    beforeEach(() => {
      let columns = new SeatColumn();
      columns.columnNumber = 0;
      columns.seats.push(seat1);
      component.columnsOfSeats = [];
      component.columnsOfSeats.push(columns);
    });

    testCases.forEach((test, index) => {
      it(`setSeatColor with color ${test.colour} correctly, expecting ${test.expect} (testCase: ${index + 1})`, () => {
        component.setSeatColor(test.colour, test.columnInTestModel, test.rowInTestModel);
        let colour = seat1.color;
        expect(colour).toEqual(test.expect);
      });
    });

    afterEach(() => {
      seat1.color = 'grey';
      seat2.color = 'grey';
    });
  });

  describe('setSeatSelect Tests', () => {
    const testCases = [
      { colour: 'grey', columnInTestModel: 0, rowInTestModel: 0, expect: 'grey' },
      { colour: 'darkorange', columnInTestModel: 0, rowInTestModel: 1, expect: 'darkgrey' }
    ];

    let columns = new SeatColumn();

    beforeEach(() => {
      component.selectedSeats = new Set<Seat>();
      component.selectedSeats.add(seat2);
      columns = new SeatColumn();
      columns.columnNumber = 0;
      columns.seats.push(seat1);
      columns.seats.push(seat2);
      component.columnsOfSeats = [];
      component.columnsOfSeats.push(columns);
    });

    testCases.forEach((test, index) => {
      it(`selectSeat assign select with ${test.colour} correctly, expecting ${test.expect} (testCase: ${index + 1})`, () => {
        columns.seats[test.rowInTestModel].color = test.colour;
        component.selectSeat(columns.seats[test.rowInTestModel], test.columnInTestModel, test.rowInTestModel);
        let colour = columns.seats[test.rowInTestModel].color;
        expect(colour).toEqual(test.expect);
      });
    });

    afterEach(() => {
      seat1.color = 'grey';
      seat2.color = 'darkorange';
    });
  });
});