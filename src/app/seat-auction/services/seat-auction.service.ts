import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SeatAuctionService {
  timeRemainingToBid = this.socket.fromEvent<number>('timeRemaining');
  endAuction = this.socket.fromEvent<boolean>('endAuction');

  constructor(private socket: Socket) { }
}
