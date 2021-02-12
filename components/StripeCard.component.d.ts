/// <reference types="stripe-v3" />
import { ElementRef, EventEmitter } from "@angular/core";
import { StripeScriptTag } from "../StripeScriptTag";
import { StripeSource } from "./StripeSource.component";
export declare class StripeCard extends StripeSource {
    ElementRef: ElementRef;
    StripeScriptTag: StripeScriptTag;
    createOptions: stripe.elements.ElementsCreateOptions;
    options: stripe.elements.ElementsOptions;
    token: stripe.Token;
    tokenChange: EventEmitter<stripe.Token>;
    cardMounted: EventEmitter<any>;
    complete: boolean;
    completeChange: EventEmitter<boolean>;
    changed: EventEmitter<ICardChangeEvent>;
    drawn: boolean;
    constructor(ElementRef: ElementRef, StripeScriptTag: StripeScriptTag);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    redraw(): void;
    createToken(extraData?: any): Promise<stripe.Token>;
}
interface ICardChangeEvent {
    "elementType": string;
    error?: {
        "code": string;
        "type": string;
        "message": string;
    };
    "value": {
        "postalCode": string;
    };
    "empty": boolean;
    "complete": boolean;
    "brand": string;
}
export {};
