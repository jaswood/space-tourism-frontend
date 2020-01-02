import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SelectFlightComponent } from './select-flight.component';
import { SpaceFlightPipe } from '../pipes/space-flight.pipe';
import { FlightDetailsComponent } from '../flight-details/flight-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../mocks/MockActivatedRoute';

describe('SelectFlightComponent', () => {
  let component: SelectFlightComponent;
  let fixture: ComponentFixture<SelectFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SelectFlightComponent,
        SpaceFlightPipe,
        FlightDetailsComponent
      ],
      imports: [
        HttpClientModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
