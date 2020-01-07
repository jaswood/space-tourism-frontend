import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SpaceFlight } from 'src/models/spaceFlight';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {
  @Input() spaceFlight: SpaceFlight;
  @Input() ticketsBeingOrdered: boolean;
  @Output() orderTickets = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  openTicketOrdering(value) {
    this.orderTickets.emit(value);
  }
}
