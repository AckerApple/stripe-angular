import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Module as StripeModule } from 'stripe-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StripeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
