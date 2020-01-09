import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SeatAuctionService {
  noOfBidders = this.socket.fromEvent<number>('noOfBidders');
  timeRemainingToBid = this.socket.fromEvent<number>('timeRemaining');
  endAuction = this.socket.fromEvent<boolean>('endAuction');
  newHighestBid = this.socket.fromEvent<number>('newHighestBid');
  biddingHistory = this.socket.fromEvent<number[]>('biddingHistory');
  beginAuction = this.socket.fromEvent<boolean>('beginAuction');

  constructor(private socket: Socket) { }

  bid(amount: number){
    this.socket.emit('bid', amount);
  }

  waitingToAuction(){
    this.socket.emit('joinedAuction');
  }

  readyToAuction(){
    this.socket.emit('readyToAuction');
  }

  closeAuction(){
    this.socket.emit('clearAuctionHouse');
  }

  disconnect(){
    this.socket.emit('closeAuctionDisconnect');
  }

}
