import { SpaceFlightPipe } from './space-flight.pipe';
import { SpaceFlight } from 'src/models/spaceFlight';
import { Spaceship } from 'src/models/spaceship';
import { FlightSearch } from 'src/models/flightSearch';

  let ships: Spaceship[] = [
    {
      nameCode: 'Falcon 9',
      shipId: 1,
      age: 0,
      maxSpeed: 0,
      noOfRows: 0,
      fuelCapacity: 0,
      totalSeats: 0
    },
    {
      nameCode: 'Falcon Heavy',
      shipId: 2,
      age: 0,
      maxSpeed: 0,
      noOfRows: 0,
      fuelCapacity: 0,
      totalSeats: 0
    }
  ] 

  let flights: SpaceFlight[] = [
    {
      arrivalDate:  new Date(Date.now()),
      departureDate: new Date(Date.now()),
      destination: 'Moon',
      flightNumber: 'Mun1',
      gate: 'A0',
      leavingLocation: 'Heathrow',
      ship: ships[0]
    },
    {
      arrivalDate:  new Date(Date.now()),
      departureDate: new Date(Date.now()),
      destination: 'Mars',
      flightNumber: 'Mun2',
      gate: 'A0',
      leavingLocation: 'Heathrow',
      ship: ships[1]
    }
  ];

describe('SpaceFlightPipe', () => {
  it('create an instance', () => {
    const pipe = new SpaceFlightPipe();
    expect(pipe).toBeTruthy();
  });

  it('can filter spaceflights by ship', () => {
    var pipe = new SpaceFlightPipe();
    let flightSearch: FlightSearch = ({
      ship: 'Falcon 9',
      destination: undefined
    });
      expect(pipe.spaceFilter(flights[0], flightSearch)).toBe(true);
      expect(pipe.spaceFilter(flights[1], flightSearch)).toBe(false);
  })
});
