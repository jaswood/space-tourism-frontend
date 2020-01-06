import { TestBed } from '@angular/core/testing';

import { TicketInformationService } from './ticket-information.service';
import { HttpClientModule } from '@angular/common/http';

describe('TicketInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: TicketInformationService = TestBed.get(TicketInformationService);
    expect(service).toBeTruthy();
  });
});
