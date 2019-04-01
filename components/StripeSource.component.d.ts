import { EventEmitter, ElementRef } from "@angular/core";
import { StripeToken, StripeSource as StripeSourceType, StripeInstance, StripeCardOptions } from "../StripeTypes";
import { StripeScriptTag } from "../StripeScriptTag";
export declare class StripeSource {
    ElementRef: ElementRef;
    StripeScriptTag: StripeScriptTag;
    options: StripeCardOptions;
    catcher: EventEmitter<Error>;
    invalid: Error;
    invalidChange: EventEmitter<Error>;
    source: StripeSourceType;
    sourceChange: EventEmitter<StripeSourceType>;
    stripe: StripeInstance;
    elements: any;
    constructor(ElementRef: ElementRef, StripeScriptTag: StripeScriptTag);
    ngOnInit(): void;
    createSource(extraData?: any): Promise<StripeToken>;
}
