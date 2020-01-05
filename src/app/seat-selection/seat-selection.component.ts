import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeatsService } from './services/seats.service';
import { Subscription, empty } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Seat } from 'src/models/seat';
import { Ticket } from 'src/models/ticket';
import { SpaceFlight } from 'src/models/spaceFlight';
import { Spaceship } from 'src/models/spaceship';
import { SeatColumn } from 'src/models/seatColumn';
import { TicketInformationService } from '../ticket-information/services/ticket-information.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit, OnDestroy {
  private noOfBiddersSub: Subscription;
  private othersReadyToAuctionSub: Subscription;
  private beginAuctionSub: Subscription;
  noOfBidders: number;
  othersReadyToAuction: boolean;
  beginAuction: boolean;


  ticket: Ticket = new Ticket();
  columnsOfSeats: SeatColumn[] = [];
  noOfColumns: number;
  numberOfSeatsInARow = 5;
  //sets are better for looking for values way faster than arrays and easier to work with set.has()
  selectedSeats = new Set<Seat>(); 

  constructor(private seatService: SeatsService,
    private ticketService: TicketInformationService) { }

  ngOnInit() {
    //get ticket info form routing history
    if (window.history.state.data != undefined) {
      this.ticket = window.history.state.data.ticket;
    }
    else {
      this.ticket.spaceFlight = new SpaceFlight();
      this.ticket.spaceFlight.ship = new Spaceship();
      this.ticket.spaceFlight.arrivalDate = new Date(Date.now());
      this.ticket.spaceFlight.departureDate = new Date(Date.now());
      this.ticket.spaceFlight.availableSeats = 20;
      this.ticket.spaceFlight.flightNumber = "MUN001";
      this.ticket.spaceFlight.destination = "etx";
      this.ticket.spaceFlight.leavingLocation = "etx2";
      this.ticket.spaceFlight.gate = "1";
      this.ticket.spaceFlight.ship.nameCode = "1ooo";
      this.ticket.spaceFlight.ship.noOfRows = 5;
      this.ticket.spaceFlight.ship.totalSeats = 40;
      this.ticket.spaceFlight.ship.age = 1;
      this.ticket.spaceFlight.ship.maxSpeed = 1000;
      this.ticket.seatQuantity = 2;
      this.ticket.firstName = 'k';
      this.ticket.lastName = 'j';
      this.ticket.emailAddress = 'alkkaj';
      this.ticket.dob = new Date(Date.now());
    }

    this.noOfColumns = this.calculateNumberOfColumns();
    this.columnsOfSeats = new Array<SeatColumn>(this.noOfColumns);
    this.setUpSeats();
    this.assignReservedSeats();

    this.noOfBiddersSub = this.seatService.noOfBidders
      .subscribe(noOfBidders => this.noOfBidders = noOfBidders );
    this.othersReadyToAuctionSub = this.seatService.othersReadyToAuction
      .subscribe(ready => this.othersReadyToAuction = ready);
    this.beginAuctionSub = this.seatService.beginAuction
      .subscribe(begin => this.beginAuction = begin);
  }

  ngOnDestroy() {
    this.noOfBiddersSub.unsubscribe();
    this.othersReadyToAuctionSub.unsubscribe();
    this.beginAuctionSub.unsubscribe();
  }

  testSockets() {
    this.seatService.registerFlightAuction(this.ticket.spaceFlight.flightNumber);
  }

  readyToAuction() {
    this.seatService.readyToAuction();
  }

  selectSeat(seat: Seat, columnIndex: number, seatIndex: number) {
    //if the seat is already in the array then delete if clicked again
    if (this.selectedSeats.has(seat)) {
      this.selectedSeats.delete(seat);
      this.setSeatColor('darkgrey', columnIndex, seatIndex);
    }
    else if (this.selectedSeats.size < this.ticket.seatQuantity && seat.color !== 'grey') { //grey === reserverd
      this.selectedSeats.add(seat);
      this.setSeatColor('darkorange', columnIndex, seatIndex);
    }
  }

  setSeatColor(color: string, column: number, row: number) {
    //uses event binding in the DOM to set colour of square
    this.columnsOfSeats[column].seats[row].color = color;
  }

  calculateNumberOfColumns(): number {
    return (this.ticket.spaceFlight.ship.totalSeats / this.numberOfSeatsInARow)
  }

  //creates the array of seats
  setUpSeats() {
    //number of columns has a number of seats with indexes corrisponding to seat/column numbers
    for (let i = 0; i < this.noOfColumns; i++) {
      this.columnsOfSeats[i] = new SeatColumn();
      this.columnsOfSeats[i].columnNumber = i;
      this.columnsOfSeats[i].seats = new Array<Seat>(this.numberOfSeatsInARow);
      for (let j = 0; j < this.numberOfSeatsInARow; j++) {
        this.columnsOfSeats[i].seats[j] = new Seat();
        this.columnsOfSeats[i].seats[j].seatCode = this.generateSeatCode(j);
        this.columnsOfSeats[i].seats[j].seatNo = i;
      }
    }
  }

  //set the already booked seats to the colour of dark grey
  assignReservedSeats() {
    //need to get the reserved seats from api first
    this.seatService.getReservedSeats(this.ticket.spaceFlight.flightNumber).subscribe((seats) => {
      for (let seat of seats) { //for each reservedseat check each columns every seat
        this.columnsOfSeats.forEach(column => { 
          for (let i = 0; i < column.seats.length; i++) {
            if (column.seats[i].seatNo === seat.seatNo && column.seats[i].seatCode === seat.seatCode) {
              this.columnsOfSeats[seat.seatNo].seats[i].color = 'grey'; //change seat to reserved (grey)
            }
          }
        });
      }
    });
  }

  //generate a seat letter... mostly to look official
  generateSeatCode(seatNo: number): string {
    switch (seatNo) {
      case 0:
        return 'A';
      case 1:
        return 'B';
      case 2:
        return 'C';
      case 3:
        return 'D';
      case 4:
        return 'E';
    }
  }

  //finalise ticket details and order ticket
  orderTickets() {
    this.ticket.seats = Array.from(this.selectedSeats);
    this.ticket.flightNumber = this.ticket.spaceFlight.flightNumber;
    this.ticket.ticketNumber = this.generateTicketNumber();
    console.log(this.ticket);
    this.seatService.postTicket(this.ticket).subscribe();
  }

  //generate a ticket number
  generateTicketNumber(): string {
    let number = Math.round((Math.random() * 10000));
    return ('T' + this.ticket.flightNumber + number.toString());
  }

}
