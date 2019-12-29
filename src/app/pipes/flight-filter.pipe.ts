import { Pipe, PipeTransform } from '@angular/core';
import { SpaceFlight } from 'src/models/spaceFlight';
import { FlightSearch } from 'src/models/flightSearch';

@Pipe({
    name: 'FlightFilter',
    pure: false
})

export class FlightFilterPipe implements PipeTransform {
    transform(flights: SpaceFlight[], filter: FlightSearch): any {
        //if items or filter is empty then return array
        debugger;
        if (!flights || ((filter.destination == undefined || filter.destination == '') && filter.ship == undefined)) {
            return flights
        }

        return flights.filter((flight: SpaceFlight) => this.spaceFilter(flight, filter));
    }

    spaceFilter(flight: SpaceFlight, filter: FlightSearch) {
        if ((filter.destination != undefined || filter.destination != '') && filter.ship == undefined) {
            return flight.destination.toLowerCase().includes(filter.destination.toLocaleLowerCase());
        }
        else if (filter.ship != undefined && (filter.destination == undefined || filter.destination == '')) {
            return flight.ship.nameCode.toLocaleLowerCase() == filter.ship.toLocaleLowerCase();
        }
        else if ((filter.destination != undefined || filter.destination != '') && filter.ship != undefined) {
            return ((flight.ship.nameCode.toLocaleLowerCase() == filter.ship.toLocaleLowerCase())
                && (flight.destination.toLocaleLowerCase().includes(filter.destination.toLocaleLowerCase())));
        }
        return false;
    }
}

