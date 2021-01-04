/// <reference types="stripe-v3" />
export * from "./StripeTypes";
import { ModuleWithProviders } from "@angular/core";
export { StripeScriptTag } from "./StripeScriptTag";
export { StripeSource } from "./components/StripeSource.component";
export { StripeCard } from "./components/StripeCard.component";
export { StripeBank } from "./components/StripeBank.component";
export declare class StripeModule {
    static forRoot(publishableKey?: string, options?: stripe.StripeOptions): ModuleWithProviders<StripeModule>;
}
/**
 * @deprecated Please import `StripeModule` directly
 */
export declare const Module: typeof StripeModule;
