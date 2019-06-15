import { EventEmitter } from "@angular/core";
import { StripeCardOptions } from "../StripeTypes";
import { StripeComponent } from "./StripeComponent";
import { StripeToken } from "../StripeTypes";
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
    options: StripeCardOptions;
    token: StripeToken;
    tokenChange: EventEmitter<StripeToken>;
    constructor(StripeScriptTag: StripeScriptTag);
    createToken(data?: any): Promise<StripeToken>;
}
