import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from 'src/models/ticket';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketInformationService {

  constructor(private http: HttpClient) { }

  putSeatsAvailable(seatsAvailable: number): Observable<number> {
    return this.http.put<number>(environment.url + '/seats/seat', seatsAvailable)
      .pipe(
        catchError(this.handleError<number>('putSeatsAvailable', seatsAvailable))
      );
  }

  getTicket(ticketNumber: string): Observable<Ticket> {
    return this.http.get<Ticket>(environment.url + `/tickets/${ticketNumber}`)
    .pipe(
      catchError(this.handleError<Ticket>('getTicket'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error('{{operation}}\n' + error);
      return of(result as T);
    }
  }
}
