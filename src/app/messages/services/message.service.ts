import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: String[] = [];

  constructor(private http: HttpClient) { }

  add(message: string) {
    this.messages.push(message);
  }

  clear(){
    this. messages = [];
  }
}
