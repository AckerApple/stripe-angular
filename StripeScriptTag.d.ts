/// <reference types="stripe-v3" />
import { Stripe } from "./StripeTypes";
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
}
