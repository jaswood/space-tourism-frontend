import { Seat } from 'src/models/seat';
import { Socket } from 'ngx-socket-io';

export class MockSeatService {
    socket: Socket;
    seat = this.socket.fromEvent<Seat>('seat');

}