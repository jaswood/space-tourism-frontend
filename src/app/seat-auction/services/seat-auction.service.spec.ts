import { TestBed } from '@angular/core/testing';

import { SeatAuctionService } from './seat-auction.service';

describe('SeatAuctionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeatAuctionService = TestBed.get(SeatAuctionService);
    expect(service).toBeTruthy();
  });
});
