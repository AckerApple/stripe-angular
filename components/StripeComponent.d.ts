/// <reference types="stripe-v3" />
import { EventEmitter } from "@angular/core";
import { StripeScriptTag } from "../StripeScriptTag";
import * as i0 from "@angular/core";
export declare class StripeComponent {
    StripeScriptTag: StripeScriptTag;
    catcher: EventEmitter<stripe.Error>;
    invalid?: stripe.Error;
    invalidChange: EventEmitter<stripe.Error>;
    stripe: stripe.Stripe;
    constructor(StripeScriptTag: StripeScriptTag);
    ngOnInit(): void;
    init(): Promise<stripe.Stripe>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StripeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StripeComponent, "stripe-component", never, { "invalid": "invalid"; }, { "catcher": "catch"; "invalidChange": "invalidChange"; }, never, never>;
}
