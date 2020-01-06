import { SpaceFlight } from './spaceFlight';
import { Seat } from './seat';

export class Ticket {
    ticketNumber: string;
    firstName: string;
    lastName: string;
    dob: Date;
    passportNumber: number;
    seatQuantity: number;
    emailAddress: string;
    flightNumber: string;
    spaceFlight: SpaceFlight;
    seats?: Seat[] = [];
}