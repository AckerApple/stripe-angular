/// <reference types="stripe-v3" />
import { ModuleWithProviders } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "./components/StripeComponent";
import * as i2 from "./components/StripeSource.component";
import * as i3 from "./components/StripeCard.component";
import * as i4 from "./components/StripeBank.component";
import * as i5 from "@angular/common";
export * from "./StripeTypes";
export { StripeComponent } from "./components/StripeComponent";
export { StripeScriptTag } from "./StripeScriptTag";
export { StripeSource } from "./components/StripeSource.component";
export { StripeCard } from "./components/StripeCard.component";
export { StripeBank } from "./components/StripeBank.component";
export declare class StripeModule {
    static forRoot(publishableKey?: string, options?: stripe.StripeOptions): ModuleWithProviders<StripeModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StripeModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<StripeModule, [typeof i1.StripeComponent, typeof i2.StripeSource, typeof i3.StripeCard, typeof i4.StripeBank], [typeof i5.CommonModule], [typeof i1.StripeComponent, typeof i2.StripeSource, typeof i3.StripeCard, typeof i4.StripeBank]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<StripeModule>;
}
/**
 * @deprecated Please import `StripeModule` directly
 */
export declare const Module: typeof StripeModule;
