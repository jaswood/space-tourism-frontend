import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SeatAuctionService } from './services/seat-auction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seat-auction',
  templateUrl: './seat-auction.component.html',
  styleUrls: ['./seat-auction.component.css']
})
export class SeatAuctionComponent implements OnInit, OnChanges {
  @Input() beginAuction: boolean;

  timeRemainingSub: Subscription;
  endAuctionSub: Subscription;
  highestBidSub: Subscription;
  biddingHistorySub: Subscription;
  timeRemaining: number;
  endAuction: boolean;
  highestBid: number = 0;
  biddingHistory: number[];

  notEnough: boolean = false;

  constructor(private seatAuctionService: SeatAuctionService) { }

  ngOnInit() {
    this.timeRemainingSub = this.seatAuctionService.timeRemainingToBid
      .subscribe(time => {
      this.timeRemaining = time
        console.log(this.timeRemaining)
      });

    this.endAuctionSub = this.seatAuctionService.endAuction
      .subscribe(end => {
        this.endAuction = end;
        console.log(this.endAuction)
      });

    this.highestBidSub = this.seatAuctionService.newHighestBid
      .subscribe(bid => {
        this.highestBid = bid;
        console.log(this.highestBid)
      });

    this.biddingHistorySub = this.seatAuctionService.biddingHistory
      .subscribe(hist => {
        this.biddingHistory = hist;
        console.log(this.biddingHistory)
      });
  }

  ngOnDestroy(): void {
    this.timeRemainingSub.unsubscribe();
    this.endAuctionSub.unsubscribe();
    this.biddingHistorySub.unsubscribe();
    this.highestBidSub.unsubscribe();
  }

  ngOnChanges(): void {
    if (this.beginAuction === true) {
      this.beginAuction = false;
    }
  }

  bid(amount) {
    this.seatAuctionService.bid(amount);
  }
}
