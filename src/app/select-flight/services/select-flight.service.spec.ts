import { TestBed } from '@angular/core/testing';

import { SelectFlightService } from './select-flight.service';

describe('SelectFlightService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectFlightService = TestBed.get(SelectFlightService);
    expect(service).toBeTruthy();
  });
});
