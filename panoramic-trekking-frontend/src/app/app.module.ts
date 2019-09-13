import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
