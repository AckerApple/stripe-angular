import { EventEmitter, ElementRef } from "@angular/core";
import { StripeInstance, StripeCardOptions } from "../StripeTypes";
import { StripeScriptTag } from "../StripeScriptTag";
import { StripeToken } from "../StripeTypes";
export declare class StripeCard {
    ElementRef: ElementRef;
    StripeScriptTag: StripeScriptTag;
    stripe: StripeInstance;
    elements: any;
    options: StripeCardOptions;
    catcher: EventEmitter<Error>;
    invalid: Error;
    invalidChange: EventEmitter<Error>;
    token: StripeToken;
    tokenChange: EventEmitter<StripeToken>;
    constructor(ElementRef: ElementRef, StripeScriptTag: StripeScriptTag);
    ngOnInit(): void;
    createToken(extraData?: any): Promise<StripeToken>;
}
