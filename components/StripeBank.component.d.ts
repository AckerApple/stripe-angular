import { EventEmitter, ElementRef } from "@angular/core";
import { StripeInstance, StripeCardOptions } from "../StripeTypes";
import { StripeScriptTag } from "../StripeScriptTag";
import { StripeToken } from "../StripeTypes";
export declare class StripeBank {
    ElementRef: ElementRef;
    StripeScriptTag: StripeScriptTag;
    options: StripeCardOptions;
    catcher: EventEmitter<Error>;
    invalid: Error;
    invalidChange: EventEmitter<Error>;
    token: StripeToken;
    tokenChange: EventEmitter<StripeToken>;
    stripe: StripeInstance;
    elements: any;
    constructor(ElementRef: ElementRef, StripeScriptTag: StripeScriptTag);
    ngOnInit(): void;
    createToken(data: any): any;
}
