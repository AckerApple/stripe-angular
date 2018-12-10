export * from "./StripeTypes";
import { ModuleWithProviders } from "@angular/core";
export { StripeScriptTag } from "./StripeScriptTag";
export { StripeCard } from "./components/StripeCard.component";
export { bank_account, StripeBank } from "./components/StripeBank.component";
export declare class Module {
    static forRoot(): ModuleWithProviders;
}
