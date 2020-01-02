import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Spaceship } from 'src/models/spaceship';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { SpaceFlight } from 'src/models/spaceFlight';

@Injectable({
  providedIn: 'root'
})
export class SelectFlightService {

  constructor(
    private http: HttpClient,
  ) { }

  getSpaceships(): Observable<Spaceship[]> {
    return this.http.get<Spaceship[]>(environment.url + '/spaceship/spaceships')
      .pipe(
        catchError(this.handleError<Spaceship[]>('getSpaceships', []))
      );
  }

  getSpaceFlights(): Observable<SpaceFlight[]> {
    return this.http.get<SpaceFlight[]>(environment.url + '/flights/spaceFlights')
      .pipe(
        catchError(this.handleError<SpaceFlight[]>('getSpaceFlights', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error('{{operation}}\n' + error);
      return of(result as T);
    }
  }
}
