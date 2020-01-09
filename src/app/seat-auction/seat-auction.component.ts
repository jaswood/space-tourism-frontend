import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SeatAuctionService } from './services/seat-auction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seat-auction',
  templateUrl: './seat-auction.component.html',
  styleUrls: ['./seat-auction.component.css']
})
export class SeatAuctionComponent implements OnInit {
  @Output() availableSeatReward = new EventEmitter<number>();

  //subscriptions to socket emits
  startBiddingSub: Subscription;
  noOfBiddersSub: Subscription;
  timeRemainingSub: Subscription;
  endAuctionSub: Subscription;
  highestBidSub: Subscription;
  biddingHistorySub: Subscription;

  timeRemaining: number = 20;
  endAuction: boolean;
  highestBid: number = 0;
  biddingHistory: number[];
  noOfBidders: number;
  startBidding: boolean;

  biddingDuration = 10;
  lastBid: number = 0;
  ready: boolean = false;
  showWin = false;

  constructor(private seatAuctionService: SeatAuctionService) { }

  ngOnInit() {
    //configure all socket observers
    this.seatAuctionService.waitingToAuction();

    this.startBiddingSub = this.seatAuctionService.beginAuction.subscribe(start => this.startBidding = start);

    this.timeRemainingSub = this.seatAuctionService.timeRemainingToBid
      .subscribe(time => {
        this.timeRemaining = time;
        if (this.timeRemaining <= 0) {
          if (this.lastBid == this.highestBid && this.highestBid != 0)
            this.collectReward();
          this.seatAuctionService.closeAuction(); //after time is up, close the auction house
          this.seatAuctionService.disconnect();
        }
      });

    this.endAuctionSub = this.seatAuctionService.endAuction
      .subscribe(end => this.endAuction = true);

    this.highestBidSub = this.seatAuctionService.newHighestBid
      .subscribe(bid => this.highestBid = bid);

    this.biddingHistorySub = this.seatAuctionService.biddingHistory
      .subscribe(hist => this.biddingHistory = hist);

    this.noOfBiddersSub = this.seatAuctionService.noOfBidders
      .subscribe(noOfBidders => this.noOfBidders = noOfBidders );
  } 

  ngOnDestroy(): void {
    //destory all socket observers
    this.timeRemainingSub.unsubscribe();
    this.endAuctionSub.unsubscribe();
    this.biddingHistorySub.unsubscribe();
    this.highestBidSub.unsubscribe();
    this.noOfBiddersSub.unsubscribe();
  }

  bid(amount) {
    if (amount != this.highestBid) { //validation check for highest bidder
      this.lastBid = amount;
      this.seatAuctionService.bid(amount);
    }
  }

  clickStartBidding() {
    this.ready = true;
    this.seatAuctionService.readyToAuction();
  }

  collectReward() {
    this.showWin = true;
    this.availableSeatReward.emit(1);
  }
}
