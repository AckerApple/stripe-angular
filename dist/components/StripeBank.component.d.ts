/// <reference types="stripe-v3" />
import { EventEmitter } from "@angular/core";
import { StripeComponent } from "./StripeComponent";
import { StripeScriptTag } from "../StripeScriptTag";
export interface bank_account {
    country: string;
    currency: string;
    routing_number: string;
    account_number: string;
    account_holder_name: string;
    account_holder_type: string;
}
export declare class StripeBank extends StripeComponent {
    StripeScriptTag: StripeScriptTag;
    options: stripe.elements.ElementOptions;
    token: stripe.Token;
    tokenChange: EventEmitter<stripe.Token>;
    constructor(StripeScriptTag: StripeScriptTag);
    createToken(data: stripe.BankAccountTokenOptions): Promise<stripe.Token>;
}
