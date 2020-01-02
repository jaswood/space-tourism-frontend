import { TestBed } from '@angular/core/testing';

import { SelectFlightService } from './select-flight.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('SelectFlightService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: SelectFlightService = TestBed.get(SelectFlightService);
    expect(service).toBeTruthy();
  });
});
