import { Component, OnInit } from '@angular/core';
import { Spaceship } from 'src/models/spaceship';
import { SelectFlightService } from './services/select-flight.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select-flight',
  templateUrl: './select-flight.component.html',
  styleUrls: ['./select-flight.component.css']
})
export class SelectFlightComponent implements OnInit {
    spaceships: Spaceship[] = [];
    selectedShip: String;

  constructor(private selectFlightService: SelectFlightService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.spaceships = this.activatedRoute.snapshot.data['spaceships'];
    console.log(this.spaceships);

  }

}
