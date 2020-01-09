import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeatsService } from './services/seats.service';
import { Subscription } from 'rxjs';
import { Seat } from 'src/models/seat';
import { Ticket } from 'src/models/ticket';
import { SpaceFlight } from 'src/models/spaceFlight';
import { Spaceship } from 'src/models/spaceship';
import { SeatColumn } from 'src/models/seatColumn';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit, OnDestroy {
  beingReservedSeatsSub: Subscription;
  unreservedSeatSub: Subscription;

  beginAuction: boolean = false;
  auctionThreshold = 10;
  showAuctionOptions: boolean = false;
  ticket: Ticket = new Ticket();
  columnsOfSeats: SeatColumn[] = [];
  noOfColumns: number;
  numberOfSeatsInARow = 5;
  //sets are better for looking for values way faster than arrays and easier to work with set.has()
  selectedSeats = new Set<Seat>();

  constructor(private seatService: SeatsService,
    private router: Router) { }

  ngOnInit() {
    //get ticket info form routing history
    if (window.history.state != undefined) {
      if (window.history.state.data != undefined)
        this.ticket = window.history.state.data.ticket;
    }

    if (this.ticket.spaceFlight != undefined) {

      if (this.ticket.spaceFlight.availableSeats < this.auctionThreshold) {
        this.showAuctionOptions = true;
        this.ticket.seatQuantity = 0;
      }

      this.seatService.registerFlightAuction(this.ticket.spaceFlight.flightNumber);

      this.beingReservedSeatsSub = this.seatService.reservedSeating.subscribe((seats) => {
        seats.forEach((seat) => {
          this.setSeatColor('grey', seat.seatNo, this.generateSeatCodeNumber(seat.seatCode));
        });
      });

      this.unreservedSeatSub = this.seatService.unreservingSeat.subscribe((seat) => {
        this.setSeatColor('darkgrey', seat.seatNo, this.generateSeatCodeNumber(seat.seatCode));
      });

      this.noOfColumns = this.calculateNumberOfColumns();
      this.columnsOfSeats = new Array<SeatColumn>(this.noOfColumns);
      this.setUpSeats();
      this.assignReservedSeats();
    }
  }

  ngOnDestroy() {
    this.beingReservedSeatsSub.unsubscribe();
    this.unreservedSeatSub.unsubscribe()
  }

  joinAuction() {
    this.beginAuction = true;
  }

  selectSeat(seat: Seat, columnIndex: number, seatIndex: number) {
    //if the seat is already in the array then delete if clicked again
    if (this.selectedSeats.has(seat)) {
      this.selectedSeats.delete(seat);
      this.seatService.unReserveSeat(seat); //unreserving the seat on peers
      this.setSeatColor('darkgrey', columnIndex, seatIndex);
    }
    else if (this.selectedSeats.size < this.ticket.seatQuantity && seat.color !== 'grey') { //grey === reserverd
      this.selectedSeats.add(seat);
      this.seatService.reserveSeat(Array.from(this.selectedSeats)); //reserving seat on peers
      this.setSeatColor('darkorange', columnIndex, seatIndex);
    }
  }

  setSeatColor(color: string, column: number, row: number) {
    //uses event binding in the DOM to set colour of square
    this.columnsOfSeats[column].seats[row].color = color;
  }

  //calculate the number of columns of seats
  calculateNumberOfColumns(): number {
    if (this.ticket.spaceFlight.ship.totalSeats > 0) {

      if ((this.ticket.spaceFlight.ship.totalSeats / this.numberOfSeatsInARow) >= 1) {
        return this.ticket.spaceFlight.ship.totalSeats / this.numberOfSeatsInARow;
      } else {
        this.numberOfSeatsInARow = this.ticket.spaceFlight.ship.totalSeats;
        return 1;
      }
      
    } else
      return 0;
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
        this.columnsOfSeats[i].seats[j].seatCode = this.generateSeatCodeLetter(j);
        this.columnsOfSeats[i].seats[j].seatNo = i;
      }
    }
  }

  //set the already booked seats to the colour of dark grey
  assignReservedSeats() {
    this.seatService.getReservedSeats(this.ticket.spaceFlight.flightNumber).subscribe((seats) => {
      for (let seat of seats) {
        this.setSeatColor('grey', seat.seatNo, this.generateSeatCodeNumber(seat.seatCode));
      }
    });
  }

  //generate a seat letter... mostly to look official
  generateSeatCodeLetter(seatNo: number): string {
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
      default:
        return '';
    }
  }

  //generate a seat number
  generateSeatCodeNumber(seatNo: string): number {
    switch (seatNo) {
      case 'A':
        return 0;
      case 'B':
        return 1;
      case 'C':
        return 2;
      case 'D':
        return 3;
      case 'E':
        return 4;
    }
  }

  //finalise ticket details and order ticket
  orderTickets() {
    this.ticket.seats = Array.from(this.selectedSeats);
    this.ticket.flightNumber = this.ticket.spaceFlight.flightNumber;
    this.ticket.ticketNumber = this.generateTicketNumber();
    this.seatService.postTicket(this.ticket).subscribe(() => {
      this.router.navigateByUrl('', { state: { data: { ticketNumber: this.ticket.ticketNumber } } });
    });
  }

  //generate a ticket number
  generateTicketNumber(): string {
    let number = Math.round((Math.random() * 100000));
    return ('T' + this.ticket.flightNumber + number.toString());
  }

  closeAuction() {
    this.showAuctionOptions = false;
    this.beginAuction = false;
    this.seatService.disconnect();
    if (this.ticket.seatQuantity == 0) {
      this.router.navigateByUrl('');
    }
  }
}
