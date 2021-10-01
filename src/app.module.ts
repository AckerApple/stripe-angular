import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppComponent } from "./components/app.component"
import { ServerToolsComponent } from "./components/server-tools.component"
import { SimpleRouteEditComponent } from "./components/simple-route-edit.component"
import { DumpComponent } from "./components/dump.component"
import { MenuOptionsComponent } from "./components/menu-options.component"
import { ToolWrapComponent } from "./components/tool-wrap.component"
export { AppComponent } from "./components/app.component"
import { StripeModule } from "stripe-angular"

@NgModule({
  imports:[
    BrowserModule,
    StripeModule.forRoot()
  ],
  declarations: [
    AppComponent,
    MenuOptionsComponent,
    DumpComponent,
    ServerToolsComponent,
    ToolWrapComponent,
    SimpleRouteEditComponent,
  ],
  bootstrap:[ AppComponent ]
}) export class AppModule {}