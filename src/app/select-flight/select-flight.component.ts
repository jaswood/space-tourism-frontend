import { Component, OnInit } from '@angular/core';
import { Spaceship } from 'src/models/spaceship';
import { SelectFlightService } from './services/select-flight.service';
import { ActivatedRoute } from '@angular/router';
import { SpaceFlight } from 'src/models/spaceFlight';
import { FlightSearch } from 'src/models/flightSearch';

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
    orderingTickets: boolean = true;

  constructor(private selectFlightService: SelectFlightService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(this.activatedRoute.snapshot != undefined) {
      var data = this.activatedRoute.snapshot.data['data'];
    }

    if(data != null) {
      data.spaceships.subscribe(data => {this.spaceships = data;});
      data.spaceFlights.subscribe(data => {this.spaceFlights = data;});
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


}
