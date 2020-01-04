import { Component, OnInit, Input } from '@angular/core';
import { SpaceFlight } from 'src/models/spaceFlight';
import { Ticket } from 'src/models/ticket';
import { MatDatepickerInputEvent } from '@angular/material';
import { TicketInformationService } from './services/ticket-information.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-information',
  templateUrl: './ticket-information.component.html',
  styleUrls: ['./ticket-information.component.css']
})
export class TicketInformationComponent implements OnInit {
  @Input() spaceFlight: SpaceFlight;

  maxDate = new Date();
  ticket = new Ticket();

  constructor(private ticketInfoService: TicketInformationService,
    private router: Router) { }

  ngOnInit() {
    this.maxDate.setDate(this.workoutMaxDate())
    console.log(this.maxDate)
  }

  workoutMaxDate(): number {
    return (this.maxDate.getDate() - (365*16))
  }

  submitTicketRequest() {
    this.router.navigateByUrl(`/seat-selection/${this.spaceFlight.flightNumber}`, {state: {data: {ticket: this.ticket}}});
    // this.ticketInfoService.postTicket(this.ticket)
  }

  firstNameOnKey(value) {
    this.ticket.firstName = value;
  }

  lastNameOnKey(value) {
    this.ticket.lastName = value;
  }

  passportNoOnKey(value) {
    this.ticket.passportNumber = value;
  }

  setDate(type: string, event: MatDatepickerInputEvent<Date>) {
    this.ticket.dob = event.value;
  }

  seatQuantity(value) {
    this.ticket.seatQuantity = value;
  }

  emailAddressOnKey(value) {
    this.ticket.emailAddress = value
  }
}
