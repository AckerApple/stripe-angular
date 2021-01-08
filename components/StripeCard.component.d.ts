/// <reference types="stripe-v3" />
import { ElementRef, EventEmitter } from "@angular/core";
import { StripeScriptTag } from "../StripeScriptTag";
import { StripeSource } from "./StripeSource.component";
export declare class StripeCard extends StripeSource {
    ElementRef: ElementRef;
    StripeScriptTag: StripeScriptTag;
    options: stripe.elements.ElementsOptions;
    token: stripe.Token;
    tokenChange: EventEmitter<stripe.Token>;
    cardMounted: EventEmitter<any>;
    complete: boolean;
    completeChange: EventEmitter<boolean>;
    changed: EventEmitter<any>;
    drawn: boolean;
    constructor(ElementRef: ElementRef, StripeScriptTag: StripeScriptTag);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    redraw(): void;
    createToken(extraData?: any): Promise<stripe.Token>;
}
