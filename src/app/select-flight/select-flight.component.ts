import { Component, OnInit } from '@angular/core';
import { SelectFlightService } from './services/select-flight.service';
import { Spaceship } from 'src/models/spaceship';

@Component({
  selector: 'app-select-flight',
  templateUrl: './select-flight.component.html',
  styleUrls: ['./select-flight.component.css']
})
export class SelectFlightComponent implements OnInit {
    spaceships: Spaceship[];

  constructor(private selectFlightService: SelectFlightService) { }

  ngOnInit() {
    this.selectFlightService.getSpaceships().subscribe((res) => {
      this.spaceships = res;
    });
  }

}
