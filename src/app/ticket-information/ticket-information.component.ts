import { Component, OnInit, Input } from '@angular/core';
import { SpaceFlight } from 'src/models/spaceFlight';

@Component({
  selector: 'app-ticket-information',
  templateUrl: './ticket-information.component.html',
  styleUrls: ['./ticket-information.component.css']
})
export class TicketInformationComponent implements OnInit {
  @Input() spaceFlight: SpaceFlight;

  constructor() { }

  ngOnInit() {
  }

}
