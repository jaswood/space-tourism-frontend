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
  reservedSeating = this.socket.fromEvent<Seat[]>('seatsBeingReserved');
  unreservingSeat = this.socket.fromEvent<Seat>('unreserveSeat');

  constructor(private socket: Socket,
    private http: HttpClient) { }

    registerFlightAuction(flightNo: string){
    this.socket.emit('registerForFlightAuction', flightNo);
  }

  reserveSeat(seats: Seat[]){
    this.socket.emit('reservingSeats', seats);
  }

  unReserveSeat(seat: Seat){
    this.socket.emit('unreservingSeats', seat);
  }

  disconnect() {
    this.socket.emit('closeAuctionDisconnect');
  }

  postTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(environment.url + '/tickets/ticket', ticket)
      .pipe(
        catchError(this.handleError<Ticket>('PostTicket', ticket))
      );
  }

  //mapping the array of seat to remove the colouring
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
