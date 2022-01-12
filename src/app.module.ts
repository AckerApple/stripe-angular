import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppComponent } from "./components/app.component"

export { AppComponent } from "./components/app.component"
import { declarations } from "./app.module.declarations"
import { StripeModule } from "stripe-angular"

@NgModule({
  imports:[
    BrowserModule,
    StripeModule.forRoot()
  ],
  declarations,
  bootstrap:[ AppComponent ]
}) export class AppModule {}