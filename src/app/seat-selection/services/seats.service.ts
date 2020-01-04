import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Seat } from 'src/models/seat';
import { Ticket } from 'src/models/ticket';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {
  seat = this.socket.fromEvent<Seat>('seat');

  constructor(private socket: Socket,
    private http: HttpClient) { }

  getSeat(id: string){
    this.socket.emit('getSeat', id);
  }

  postTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(environment.url + '/tickets/ticket', ticket)
      .pipe(
        catchError(this.handleError<Ticket>('PostTicket', ticket))
      );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error('{{operation}}\n' + error);
      return of(result as T);
    }
  }
}
