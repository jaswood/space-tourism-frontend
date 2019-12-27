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
    console.log('ngoninit');
    this.selectFlightService.getSpaceships().subscribe((res) => {
      console.log('lala');
      console.log(res);
      this.spaceships = res;
      console.log(this.spaceships);
    });

  }

}
