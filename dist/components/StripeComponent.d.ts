/// <reference types="stripe-v3" />
import { EventEmitter } from "@angular/core";
import { StripeScriptTag } from "../StripeScriptTag";
export declare class StripeComponent {
    StripeScriptTag: StripeScriptTag;
    catcher: EventEmitter<stripe.Error>;
    invalid?: stripe.Error;
    invalidChange: EventEmitter<stripe.Error>;
    stripe: stripe.Stripe;
    constructor(StripeScriptTag: StripeScriptTag);
    ngOnInit(): void;
    init(): Promise<stripe.Stripe>;
}
