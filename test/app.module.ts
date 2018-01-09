import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { Your_Module_Name_Here } from "../src"

@Component({ selector: 'app', template: 'nothing here'})
export class AppComponent {}

@NgModule({
  imports: [
    BrowserModule
    //,Your_Module_Name_Here
  ],
  declarations: [ AppComponent ],
  bootstrap: [AppComponent]
}) export class AppModule {}