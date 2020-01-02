import { SpaceFlightPipe } from './space-flight.pipe';
import { SpaceFlight } from 'src/models/spaceFlight';
import { Spaceship } from 'src/models/spaceship';

  let ships: Spaceship[] = [
    {
      nameCode: 'Falcon 9',
      shipId: 0,
      age: 0,
      maxSpeed: 0,
      noOfRows: 0,
      fuelCapacity: 0,
      totalSeats: 0
    },
    {
      nameCode: 'Falcon Heavy',
      shipId: 0,
      age: 0,
      maxSpeed: 0,
      noOfRows: 0,
      fuelCapacity: 0,
      totalSeats: 0
    }
  ] 

  let flights: SpaceFlight[] = [
    {
      arrivalDate:  Date.UTC(Date.now()),
      departureDate: Date.now(),
      destination: 'Moon',
      flightNumber: 'Mun1',
    },
    {}
  ];

describe('SpaceFlightPipe', () => {
  it('create an instance', () => {
    const pipe = new SpaceFlightPipe();
    expect(pipe).toBeTruthy();
  });

  it('can filter spaceflights by ship', () => {

  })
});
