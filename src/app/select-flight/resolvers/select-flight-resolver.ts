import { Injectable } from "@angular/core";
import { SelectFlightService } from '../services/select-flight.service';
import { ActivatedRouteSnapshot, RouterState, RouterStateSnapshot, Resolve } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SelectFlightResolverService implements Resolve<any> {
    constructor(private SelectFlightService: SelectFlightService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.SelectFlightService.getSpaceships().pipe(
            catchError((error) => {
                console.error('select flight resolver\n' + error);
                //empty means the router will not proceed with the route
                return empty();
            })
        );
    }
}