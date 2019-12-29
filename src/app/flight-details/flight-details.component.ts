import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SpaceFlight } from 'src/models/spaceFlight';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit, OnChanges {
  @Input() set selectedFlight(flight: SpaceFlight) {
      this.spaceFlight = flight || undefined;
  }
  @Input() showActions: boolean;

  spaceFlight: SpaceFlight = undefined;

  constructor() { }

  ngOnInit() {
    console.log(this.showActions);
    console.log(this.spaceFlight);
  }

  ngOnChanges(){
  }
}
