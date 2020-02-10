export * from "./StripeTypes";
import { ModuleWithProviders } from "@angular/core";
import { StripeInstanceOptions } from './StripeTypes';
export { StripeScriptTag } from "./StripeScriptTag";
export { StripeSource } from "./components/StripeSource.component";
export { StripeCard } from "./components/StripeCard.component";
export { bank_account, StripeBank } from "./components/StripeBank.component";
export declare class StripeModule {
    static forRoot(publishableKey?: string, options?: StripeInstanceOptions): ModuleWithProviders;
}
/**
 * @deprecated Please import `StripeModule` directly
 */
export declare const Module: typeof StripeModule;
