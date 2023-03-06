/// <reference types="stripe-v3" />
import { Stripe } from "./StripeTypes";
import * as i0 from "@angular/core";
export declare class StripeScriptTag {
    private document;
    src: string;
    Stripe: Stripe;
    StripeInstance: stripe.Stripe;
    load: Promise<any>;
    window: any;
    constructor(document: any, key?: string, options?: stripe.StripeOptions);
    promiseStripe(): Promise<Stripe>;
    promiseInstance(): Promise<stripe.Stripe>;
    setPublishableKey(key: string, options?: stripe.StripeOptions): Promise<stripe.Stripe>;
    injectIntoHead(): Promise<Stripe>;
    grabStripe(): Stripe;
    getTargetTagDropElement(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<StripeScriptTag, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StripeScriptTag>;
}
