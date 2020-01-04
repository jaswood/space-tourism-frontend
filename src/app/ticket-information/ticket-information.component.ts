import { Component, OnInit, Input } from '@angular/core';
import { SpaceFlight } from '../../models/spaceFlight';
import { Ticket } from '../../models/ticket';
import { MatDatepickerInputEvent } from '@angular/material';
import { TicketInformationService } from './services/ticket-information.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ticket-information',
  templateUrl: './ticket-information.component.html',
  styleUrls: ['./ticket-information.component.css']
})
export class TicketInformationComponent implements OnInit {
  @Input() spaceFlight: SpaceFlight;

  maxDate = new Date();
  ticket = new Ticket();
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    dob: new FormControl('', Validators.required), 
    passport: new FormControl('', Validators.required),
    seatQuantity: new FormControl('', [Validators.required, Validators.max(5), Validators.min(1)]),
  });
  

  constructor(private ticketInfoService: TicketInformationService,
    private router: Router) { }

  ngOnInit() {
    this.maxDate.setDate(this.workoutMaxDate())
  }

  workoutMaxDate(): number {
    return (this.maxDate.getDate() - (365*16))
  }

  submitTicketRequest() {
    this.ticket.spaceFlight = this.spaceFlight;
    this.router.navigateByUrl(`/seat-selection/${this.spaceFlight.flightNumber}`, {state: {data: {ticket: this.ticket}}});
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
      this.ticket.emailAddress = value;
  }
}
