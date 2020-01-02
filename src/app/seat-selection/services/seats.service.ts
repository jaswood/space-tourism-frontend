import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Seat } from 'src/models/seat';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {
  seat = this.socket.fromEvent<Seat>('seat');

  constructor(private socket: Socket) { }

  getSeat(id: string){
    this.socket.emit('getSeat', id);
  }
}
