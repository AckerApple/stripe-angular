/// <reference types="stripe-v3" />
import { EventEmitter } from "@angular/core";
import { StripeScriptTag } from "../StripeScriptTag";
export declare class StripeComponent {
    StripeScriptTag: StripeScriptTag;
    catcher: EventEmitter<Error>;
    invalid?: Error;
    invalidChange: EventEmitter<Error>;
    stripe: stripe.Stripe;
    constructor(StripeScriptTag: StripeScriptTag);
    ngOnInit(): void;
    init(): Promise<stripe.Stripe>;
}
