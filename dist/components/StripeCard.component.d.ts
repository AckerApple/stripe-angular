import { EventEmitter } from "@angular/core";
import { StripeToken, StripeCardOptions } from "../StripeTypes";
import { StripeSource } from "./StripeSource.component";
export declare class StripeCard extends StripeSource {
    options: StripeCardOptions;
    token: StripeToken;
    tokenChange: EventEmitter<StripeToken>;
    ngOnInit(): void;
    createToken(extraData?: any): Promise<StripeToken>;
}
