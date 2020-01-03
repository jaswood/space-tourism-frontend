import { TestBed } from '@angular/core/testing';

import { TicketInformationService } from './ticket-information.service';

describe('TicketInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TicketInformationService = TestBed.get(TicketInformationService);
    expect(service).toBeTruthy();
  });
});
