import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { SeatAuctionService } from './services/seat-auction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seat-auction',
  templateUrl: './seat-auction.component.html',
  styleUrls: ['./seat-auction.component.css']
})
export class SeatAuctionComponent implements OnInit, OnChanges {
  @Input() beginAuction: boolean;
  @Output() availableSeatReward = new EventEmitter<number>();

  othersReadyToAuctionSub: Subscription;
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
  othersReadyToAuction: boolean = false;

  biddingDuration = 10;
  lastBid: number = 0;
  showWin = false;

  constructor(private seatAuctionService: SeatAuctionService) { }

  ngOnInit() {
    this.startBiddingSub =  this.seatAuctionService.beginAuction.subscribe(start => this.startBidding = start);

    this.timeRemainingSub = this.seatAuctionService.timeRemainingToBid
      .subscribe(time => { 
        this.timeRemaining = time;
        if(this.timeRemaining <= 0)
        {
          if(this.lastBid == this.highestBid && this.highestBid != 0)
            this.collectReward();
          this.seatAuctionService.closeAuction();
          this.seatAuctionService.disconnect();
        }
      });

    this.endAuctionSub = this.seatAuctionService.endAuction
      .subscribe(end => this.endAuction = true);

    this.highestBidSub = this.seatAuctionService.newHighestBid
      .subscribe(bid => this.highestBid = bid );

    this.biddingHistorySub = this.seatAuctionService.biddingHistory
      .subscribe(hist => this.biddingHistory = hist);

      this.noOfBiddersSub = this.seatAuctionService.noOfBidders
      .subscribe(noOfBidders => this.noOfBidders = noOfBidders );

      
      this.othersReadyToAuctionSub = this.seatAuctionService.othersReadyToAuction
        .subscribe(ready => this.othersReadyToAuction = ready);
      
  }

  ngOnDestroy(): void {
    this.timeRemainingSub.unsubscribe();
    this.endAuctionSub.unsubscribe();
    this.biddingHistorySub.unsubscribe();
    this.highestBidSub.unsubscribe();
    this.noOfBiddersSub.unsubscribe();
    this.othersReadyToAuctionSub.unsubscribe();
  }

  ngOnChanges(): void {
    if (this.beginAuction === true) {
      this.beginAuction = false;
    }
  }

  bid(amount) {
    if(amount != this.highestBid){
      this.lastBid = amount;
      this.seatAuctionService.bid(amount);
    }
  }

  clickStartBidding() {
    this.seatAuctionService.readyToAuction();
  }

  collectReward() {
    this.showWin = true;
    this.availableSeatReward.emit(1);
  }
}
