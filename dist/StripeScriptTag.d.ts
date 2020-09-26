import { Stripe, StripeInstance, StripeInstanceOptions } from "./StripeTypes";
export declare class StripeScriptTag {
    src: string;
    Stripe: Stripe;
    StripeInstance: StripeInstance;
    load: Promise<any>;
    constructor(key?: string, options?: StripeInstanceOptions);
    promiseStripe(): Promise<Stripe>;
    promiseInstance(): Promise<StripeInstance>;
    setPublishableKey(key: string, options?: StripeInstanceOptions): Promise<StripeInstance>;
    injectIntoHead(): Promise<Stripe>;
    grabStripe(): any;
    getTargetTagDropElement(): HTMLHeadElement;
}
