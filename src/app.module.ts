import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppComponent } from "./components/app.component"

export { AppComponent } from "./components/app.component"
import { declarations } from "./app.module.declarations"
import { StripeModule } from "stripe-angular"
import { AckModule } from 'ack-angular'

@NgModule({
  imports:[
    BrowserModule,
    AckModule, // support api advanced features (contentModel)
    StripeModule.forRoot()
  ],
  declarations,
  bootstrap:[ AppComponent ]
}) export class AppModule {}