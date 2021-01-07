import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppComponent } from "./components/app.component"
export { AppComponent } from "./components/app.component"
import { StripeModule } from "stripe-angular"

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