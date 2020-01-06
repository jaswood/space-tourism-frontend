import { Component, OnInit } from '@angular/core';
import { Spaceship } from 'src/models/spaceship';
import { SelectFlightService } from './services/select-flight.service';
import { ActivatedRoute } from '@angular/router';
import { SpaceFlight } from 'src/models/spaceFlight';
import { FlightSearch } from 'src/models/flightSearch';
import { MatSnackBar } from '@angular/material';
import { Ticket } from 'src/models/ticket';
import { TicketInformationService } from '../ticket-information/services/ticket-information.service';

@Component({
  selector: 'app-select-flight',
  templateUrl: './select-flight.component.html',
  styleUrls: ['./select-flight.component.css']
})
export class SelectFlightComponent implements OnInit {

    spaceships: Spaceship[] = [];
    spaceFlights: SpaceFlight[] = [];
    listFilter: FlightSearch = new FlightSearch();
    selectedFlight: SpaceFlight = new SpaceFlight();
    orderingTickets: boolean = false;
    ticketNumber: string = '';
    boughtTicketDetails: Ticket;

  constructor(private selectFlightService: SelectFlightService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private ticketService: TicketInformationService) { }

  ngOnInit() {
    if(this.activatedRoute.snapshot != undefined) {
      var data = this.activatedRoute.snapshot.data['data'];
    }

    if(data != null) {
      data.spaceships.subscribe(data => {this.spaceships = data;});
      data.spaceFlights.subscribe(data => {this.spaceFlights = data;});
    }

    if (window.history.state.data != undefined) {
      this.ticketNumber = window.history.state.data.ticketNumber;
      this.openBoughtTicket();
    }
  }

  destinationOnKey(value: string) {
    this.listFilter.destination = value;
  }

  selectFlight(flight: SpaceFlight) {
    this.selectedFlight = flight;
  }

  toggleTickets() {
    this.orderingTickets = !this.orderingTickets;
  }

  openBoughtTicket() {
    this.snackBar.open(`Ticket Number: ${this.ticketNumber}`, 'Okay', {
    });
  }

  searchForTicket(value: string) {
    this.ticketService.getTicket(value).subscribe(ticket => this.boughtTicketDetails = ticket);
  }


}
