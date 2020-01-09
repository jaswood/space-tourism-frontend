import { Seat } from 'src/models/seat';
import { Socket } from 'ngx-socket-io';
import { Observable, of } from 'rxjs';

export class MockSeatService {
    socket: Socket;

    getReservedSeats(value): Observable<Seat[]> {
        let seats = [ {
            seatNo: 2,
            seatCode: 'A'
        }]; 
        return of(seats)
    }

    reserveSeat(seats) { };

    unReserveSeat(seat) { };
}