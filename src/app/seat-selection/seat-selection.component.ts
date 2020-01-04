import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeatsService } from './services/seats.service';
import { Subscription, empty } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Seat } from 'src/models/seat';
import { Ticket } from 'src/models/ticket';
import { SpaceFlight } from 'src/models/spaceFlight';
import { Spaceship } from 'src/models/spaceship';
import { SeatColumn } from 'src/models/seatColumn';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit, OnDestroy {
  private seatSub: Subscription;
  ticket: Ticket = new Ticket();
  seat: Seat;

  columnsOfSeats: SeatColumn[] = [];
  noOfColumns: number;
  numberOfSeatsInARow = 5;
  selectedSeats = new Set<Seat>();

  constructor(private seatService: SeatsService) { }

  ngOnInit() {
    if (window.history.state.data != undefined)
      this.ticket = window.history.state.data.ticket;
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
    }

    this.noOfColumns = this.calculateNumberOfColumns();
    this.columnsOfSeats = new Array<SeatColumn>(this.noOfColumns);
    this.setUpSeats();

    this.seatSub = this.seatService.seat.pipe(
      startWith({ seatNo: 2, seatCode: 'A' })
    ).subscribe(seat => this.seat = seat);
  }

  ngOnDestroy() {
    this.seatSub.unsubscribe();
  }

  testSockets() {
    console.log('here');
    console.log(this.seat);
    this.seatService.getSeat('5');
  }

  selectSeat(seat: Seat, columnIndex: number, seatIndex: number){
    if(this.selectedSeats.has(seat)){
      this.selectedSeats.delete(seat);
      this.setSeatColor('darkGrey', columnIndex, seatIndex);
    }
    else if(this.selectedSeats.size < this.ticket.seatQuantity){
      this.selectedSeats.add(seat);
      this.setSeatColor('darkorange', columnIndex, seatIndex);
    }
  }

  setSeatColor(color: string, column: number, row: number){
    this.columnsOfSeats[column].seats[row].color = color;
  }

  calculateNumberOfColumns(): number {
    return (this.ticket.spaceFlight.ship.totalSeats / this.numberOfSeatsInARow)
  }

  setUpSeats() {
    for (let i = 0; i < this.noOfColumns; i++) {
      this.columnsOfSeats[i] = new SeatColumn();
      this.columnsOfSeats[i].columnNumber = i;
      this.columnsOfSeats[i].seats = new Array<Seat>(this.numberOfSeatsInARow);
      for (let j = 0; j < this.numberOfSeatsInARow; j++) {
        this.columnsOfSeats[i].seats[j] = new Seat();
        this.columnsOfSeats[i].seats[j].seatCode = this.generateSeatCode(j);
        this.columnsOfSeats[i].seats[j].seatNo = j;
      }
    }
  }

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

  orderTickets() {
    this.ticket.seats = Array.from(this.selectedSeats);
    console.log(this.ticket);
    this.seatService.postTicket(this.ticket);
  }

}
