import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectFlightComponent } from './select-flight/select-flight.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MessagesComponent } from './messages/messages.component';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

const MaterialModules = [
  MatSelectModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule
]

@NgModule({
  declarations: [
    AppComponent,
    SelectFlightComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: SelectFlightComponent}
    ]),
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
