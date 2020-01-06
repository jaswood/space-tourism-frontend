import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from 'src/models/ticket';

@Component({
  selector: 'app-ticket-search',
  templateUrl: './ticket-search.component.html',
  styleUrls: ['./ticket-search.component.css']
})
export class TicketSearchComponent implements OnInit {
  @Input() ticket: Ticket = new Ticket();

  constructor() { }

  ngOnInit() {
  }

}
