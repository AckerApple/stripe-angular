import { EventEmitter, ElementRef } from "@angular/core";
import { StripeToken, StripeSource as StripeSourceType, StripeInstance } from "../StripeTypes";
import { StripeScriptTag } from "../StripeScriptTag";
export declare class StripeSource {
    ElementRef: ElementRef;
    StripeScriptTag: StripeScriptTag;
    catcher: EventEmitter<Error>;
    invalid: Error;
    invalidChange: EventEmitter<Error>;
    source: StripeSourceType;
    sourceChange: EventEmitter<StripeSourceType>;
    stripe: StripeInstance;
    elements: any;
    constructor(ElementRef: ElementRef, StripeScriptTag: StripeScriptTag);
    ngOnInit(): void;
    init(): Promise<StripeInstance>;
    createSource(extraData?: any): Promise<StripeToken>;
}
