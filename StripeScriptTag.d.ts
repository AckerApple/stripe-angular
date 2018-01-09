import { Stripe, StripeInstance } from "./StripeTypes";
export declare class StripeScriptTag {
    src: string;
    Stripe: Stripe;
    StripeInstance: StripeInstance;
    promise: Promise<Stripe>;
    promiseStripe(): Promise<Stripe>;
    checkKeyThrow(): StripeScriptTag;
    setPublishableKey(key: string, options?: any): Promise<StripeInstance>;
    injectIntoHead(): Promise<Stripe>;
    getTargetTagDropElement(): HTMLHeadElement | HTMLBodyElement;
}
