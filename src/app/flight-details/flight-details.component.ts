import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SpaceFlight } from 'src/models/spaceFlight';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit, OnChanges {
  @Input() spaceFlight: SpaceFlight;
  @Input() showActions: boolean;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
  }
}
