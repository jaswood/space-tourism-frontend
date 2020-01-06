import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatAuctionComponent } from './seat-auction.component';

describe('SeatAuctionComponent', () => {
  let component: SeatAuctionComponent;
  let fixture: ComponentFixture<SeatAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
