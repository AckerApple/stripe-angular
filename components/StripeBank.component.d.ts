import { EventEmitter } from "@angular/core";
import { StripeCardOptions } from "../StripeTypes";
import { StripeSource } from "./StripeSource.component";
import { StripeToken } from "../StripeTypes";
export interface bank_account {
    country: string;
    currency: string;
    routing_number: string;
    account_number: string;
    account_holder_name: string;
    account_holder_type: string;
}
export declare class StripeBank extends StripeSource {
    options: StripeCardOptions;
    token: StripeToken;
    tokenChange: EventEmitter<StripeToken>;
    createToken(data: any): Promise<StripeToken>;
}
