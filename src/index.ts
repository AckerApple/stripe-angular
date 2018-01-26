export * from "./StripeTypes"

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StripeScriptTag } from "./StripeScriptTag"
export { StripeScriptTag } from "./StripeScriptTag"

import { StripeCard } from "./components/StripeCard.component"
export { StripeCard } from "./components/StripeCard.component"

const declarations = [ StripeCard ]

@NgModule({
  imports:[
    CommonModule
  ],
  declarations: declarations,
  providers: [ StripeScriptTag ],
  exports:[ ...declarations ]
}) export class Module {}

