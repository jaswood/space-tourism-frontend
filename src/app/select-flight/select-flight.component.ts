import { Component, OnInit, OnChanges } from '@angular/core';
import { Spaceship } from 'src/models/spaceship';
import { SelectFlightService } from './services/select-flight.service';
import { ActivatedRoute } from '@angular/router';
import { SpaceFlight } from 'src/models/spaceFlight';
import { element } from 'protractor';

@Component({
  selector: 'app-select-flight',
  templateUrl: './select-flight.component.html',
  styleUrls: ['./select-flight.component.css']
})
export class SelectFlightComponent implements OnInit, OnChanges {

    spaceships: Spaceship[] = [];
    spaceFlights: SpaceFlight[] = [];
    selectedShip: String;
    destinationSearch: String = '';

  constructor(private selectFlightService: SelectFlightService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let data = this.activatedRoute.snapshot.data['data'];

    if(data != null){
      data.spaceships.subscribe(data => {this.spaceships = data;});
      data.spaceFlights.subscribe(data => {this.spaceFlights = data;});
    }
  }

  ngOnChanges() {
    this.spaceFlights.filter(this.filterSpaceFlights);
  }

  filterSpaceFlights(flight, index, array) {
    let flightDestination = flight.destination.split('');
    let searchedDest = this.destinationSearch.split('');
  }

  destinationOnKey(value: string) {
    this.destinationSearch = value;
  }

  selectFlight(index) {
    console.log('hello');
  }

}
