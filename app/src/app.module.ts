import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppComponent } from "./components/app.component"
export { AppComponent } from "./components/app.component"
import { Module as StripeModule } from "../../src/index"

@NgModule({
  imports:[
    BrowserModule,
    StripeModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  bootstrap:[ AppComponent ]
}) export class AppModule {}