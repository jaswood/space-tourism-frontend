import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SeatAuctionService {
  timeRemainingToBid = this.socket.fromEvent<number>('timeRemaining');
  endAuction = this.socket.fromEvent<boolean>('endAuction');
  newHighestBid = this.socket.fromEvent<number>('newHighestBid');
  biddingHistory = this.socket.fromEvent<number[]>('biddingHistory');

  constructor(private socket: Socket) { }

  bid(amount: number){
    this.socket.emit('bid', amount);
  }
}
