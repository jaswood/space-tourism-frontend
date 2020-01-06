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


  startBiddingSub: Subscription;
  noOfBiddersSub: Subscription;
  timeRemainingSub: Subscription;
  endAuctionSub: Subscription;
  highestBidSub: Subscription;
  biddingHistorySub: Subscription;
  timeRemaining: number =20;
  endAuction: boolean;
  highestBid: number = 0;
  biddingHistory: number[];
  noOfBidders: number;
  startBidding: boolean;

  notEnough: boolean = false;
  biddingDuration = 10;
  lastBid: number = 0;
  showWin = false;

  constructor(private seatAuctionService: SeatAuctionService) { }

  ngOnInit() {
    this.startBiddingSub =  this.seatAuctionService.beginAuction.subscribe(start => this.startBidding = start);

    this.timeRemainingSub = this.seatAuctionService.timeRemainingToBid
      .subscribe(time => { 
        this.timeRemaining = time;
        console.log(this.timeRemaining <= 0);
        if(this.timeRemaining <= 0)
        {
          if(this.lastBid == this.highestBid)
            this.collectReward();
          this.seatAuctionService.closeAuction();
          this.seatAuctionService.disconnect();
        }
      });

    this.endAuctionSub = this.seatAuctionService.endAuction
      .subscribe(end => this.endAuction = end);

    this.highestBidSub = this.seatAuctionService.newHighestBid
      .subscribe(bid => this.highestBid = bid );

    this.biddingHistorySub = this.seatAuctionService.biddingHistory
      .subscribe(hist => this.biddingHistory = hist);

      this.noOfBiddersSub = this.seatAuctionService.noOfBidders
      .subscribe(noOfBidders => this.noOfBidders = noOfBidders );
  }

  ngOnDestroy(): void {
    this.timeRemainingSub.unsubscribe();
    this.endAuctionSub.unsubscribe();
    this.biddingHistorySub.unsubscribe();
    this.highestBidSub.unsubscribe();
    this.noOfBiddersSub.unsubscribe();
  }

  ngOnChanges(): void {
    if (this.beginAuction === true) {
      this.beginAuction = false;
    }
  }

  bid(amount) {
    this.lastBid = amount;
    this.seatAuctionService.bid(amount);
  }

  clickStartBidding() {
    this.seatAuctionService.readyToAuction();
  }

  collectReward() {
    this.showWin = true;
    this.availableSeatReward.emit(1);
  }
}
