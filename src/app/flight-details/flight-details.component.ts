import { Component, OnInit, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { SpaceFlight } from 'src/models/spaceFlight';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit, OnChanges {
  @Input() spaceFlight: SpaceFlight;
  @Input() showActions: boolean;
  @Input() ticketsBeingOrdered: boolean;
  @Output() orderTickets = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
  }

  openTicketOrdering(value) {
    this.orderTickets.emit(value);
  }
}
