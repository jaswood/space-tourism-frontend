import { Injectable } from '@angular/core';
import { Spaceship } from '../../../models/spaceship'
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SelectFlightService {
  selected: Spaceship;

  constructor(
    private http: HttpClient
  ) { }

  getSpaceships(): Observable<Spaceship[]> {
    return this.http.get<Spaceship[]>(environment.url + '/spaceship/spaceships');
  }
}
