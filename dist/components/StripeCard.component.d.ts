import { EventEmitter, ElementRef } from "@angular/core";
import { StripeInstance, StripeCardOptions } from "../StripeTypes";
import { StripeScriptTag } from "../StripeScriptTag";
export declare class StripeCard {
    ElementRef: ElementRef;
    StripeScriptTag: StripeScriptTag;
    stripe: StripeInstance;
    elements: any;
    options: StripeCardOptions;
    catcher: EventEmitter<Error>;
    token: any;
    tokenChange: EventEmitter<any>;
    constructor(ElementRef: ElementRef, StripeScriptTag: StripeScriptTag);
    ngOnInit(): void;
    createToken(extraData?: any): Promise<any>;
}
