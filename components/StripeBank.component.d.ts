/// <reference types="stripe-v3" />
import { EventEmitter } from "@angular/core";
import { StripeComponent } from "./StripeComponent";
import { StripeScriptTag } from "../StripeScriptTag";
import * as i0 from "@angular/core";
export declare class StripeBank extends StripeComponent {
    StripeScriptTag: StripeScriptTag;
    options: stripe.elements.ElementOptions;
    token: stripe.Token;
    tokenChange: EventEmitter<stripe.Token>;
    constructor(StripeScriptTag: StripeScriptTag);
    createToken(data: stripe.BankAccountTokenOptions): Promise<stripe.Token>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StripeBank, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StripeBank, "stripe-bank", ["StripeBank"], { "options": "options"; "token": "token"; }, { "tokenChange": "tokenChange"; }, never, never>;
}
