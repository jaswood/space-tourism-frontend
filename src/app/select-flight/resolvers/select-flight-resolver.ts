import { Injectable } from "@angular/core";
import { SelectFlightService } from '../services/select-flight.service';
import { ActivatedRouteSnapshot, RouterState, RouterStateSnapshot, Resolve } from '@angular/router';
import { empty, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SelectFlightResolverService implements Resolve<any> {

    constructor(private SelectFlightService: SelectFlightService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let spaceFlights = this.SelectFlightService.getSpaceFlights();
        let spaceships = this.SelectFlightService.getSpaceships();
        let data = {spaceFlights: spaceFlights, spaceships: spaceships};
        return of(data);
    }
}