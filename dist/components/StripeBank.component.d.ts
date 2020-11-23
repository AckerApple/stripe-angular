import { EventEmitter } from "@angular/core";
import { ElementsOptions } from "../StripeTypes";
import { StripeComponent } from "./StripeComponent";
import { BankAccountTokenOptions, Token } from "../StripeTypes";
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
    options: ElementsOptions;
    token: Token;
    tokenChange: EventEmitter<Token>;
    constructor(StripeScriptTag: StripeScriptTag);
    createToken(data: BankAccountTokenOptions): Promise<Token>;
}
