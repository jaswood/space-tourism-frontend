import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Seat } from 'src/models/seat';
import { Ticket } from 'src/models/ticket';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SeatsService {
  noOfBidders = this.socket.fromEvent<number>('noOfBidders');
  othersReadyToAuction = this.socket.fromEvent<boolean>('otherPlayersReady');
  beginAuction = this.socket.fromEvent<boolean>('beginAuction');

  constructor(private socket: Socket,
    private http: HttpClient) { }

    registerFlightAuction(flightNo: string){
    this.socket.emit('registerForFlightAuction', flightNo);
  }

  readyToAuction(){
    this.socket.emit('readyToAuction');
  }

  postTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(environment.url + '/tickets/ticket', ticket)
      .pipe(
        catchError(this.handleError<Ticket>('PostTicket', ticket))
      );
  }

  getReservedSeats(flightNumber: string): Observable<Seat[]> {
    return this.http.get(environment.url + `/seats/reserved/${flightNumber}`)
      .pipe(
        map((res: Array<Seat>) => {
          let seats: Seat[] = [];
          for(let reservedSeat of res){
            let newSeat: Seat = new Seat();
            newSeat.seatCode = reservedSeat.seatCode;
            newSeat.seatNo = reservedSeat.seatNo;
            seats.push(newSeat);
          }
          return seats;
        }),
        catchError(this.handleError<Seat[]>('getSeats', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error('{{operation}}\n' + error);
      return of(result as T);
    }
  }
}
