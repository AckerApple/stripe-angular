import { Stripe, StripeInstance } from "./StripeTypes";
export declare class StripeScriptTag {
    src: string;
    Stripe: Stripe;
    StripeInstance: StripeInstance;
    load: Promise<any>;
    constructor();
    promiseStripe(): Promise<Stripe>;
    promiseInstance(): Promise<StripeInstance>;
    setPublishableKey(key: string, options?: any): Promise<StripeInstance>;
    injectIntoHead(): Promise<Stripe>;
    grabStripe(): any;
    getTargetTagDropElement(): HTMLHeadElement;
}
