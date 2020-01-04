import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeatsService } from './services/seats.service';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Seat } from 'src/models/seat';
import { Ticket } from 'src/models/ticket';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit, OnDestroy {
  private seatSub: Subscription;
  ticket: Ticket = new Ticket();
  seat: Seat;

  constructor(private seatService: SeatsService) { }

  ngOnInit() {
    this.ticket = window.history.state.data.ticket;
    console.log(this.ticket);
    
    this.seatSub = this.seatService.seat.pipe(
      startWith({row: 2, seat: 'A'})
    ).subscribe(seat => this.seat = seat);
  }

  ngOnDestroy() {
    this.seatSub.unsubscribe();
  }

  testSockets(){
    console.log('here');
    console.log(this.seat);
    this.seatService.getSeat('5');
  }

}
