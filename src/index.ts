export * from "./StripeTypes"

import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StripeInstanceOptions, STRIPE_OPTIONS, STRIPE_PUBLISHABLE_KEY } from './StripeTypes'
import { StripeComponent } from "./components/StripeComponent"

import { StripeScriptTag } from "./StripeScriptTag"
export { StripeScriptTag } from "./StripeScriptTag"

import { StripeSource } from "./components/StripeSource.component"
export { StripeSource } from "./components/StripeSource.component"

import { StripeCard } from "./components/StripeCard.component"
export { StripeCard } from "./components/StripeCard.component"

import { StripeBank } from "./components/StripeBank.component"
export { bank_account, StripeBank } from "./components/StripeBank.component"

const declarations = [
  StripeComponent, // ignore do not use (has to be here for extends purposes)
  StripeSource,
  StripeCard,
  StripeBank
]

@NgModule({
  imports:[
    CommonModule
  ],
  declarations,
 // providers: [ StripeScriptTag ],
  exports:[ ...declarations ]
}) export class StripeModule {
  static forRoot(publishableKey?: string, options?: StripeInstanceOptions): ModuleWithProviders<StripeModule> {
    return {
      ngModule: StripeModule,
      providers: [
        StripeScriptTag,
        {
          provide: STRIPE_PUBLISHABLE_KEY,
          useValue: publishableKey
        },
        {
          provide: STRIPE_OPTIONS,
          useValue: options
        }
      ],
    }
  }
}

/**
 * @deprecated Please import `StripeModule` directly
 */
export const Module = StripeModule
