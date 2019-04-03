import { ElementRef, EventEmitter } from "@angular/core";
import { StripeToken, StripeCardOptions } from "../StripeTypes";
import { StripeScriptTag } from "../StripeScriptTag";
import { StripeSource } from "./StripeSource.component";
export declare class StripeCard extends StripeSource {
    ElementRef: ElementRef;
    StripeScriptTag: StripeScriptTag;
    options: StripeCardOptions;
    token: StripeToken;
    tokenChange: EventEmitter<StripeToken>;
    constructor(ElementRef: ElementRef, StripeScriptTag: StripeScriptTag);
    ngOnInit(): void;
    createToken(extraData?: any): Promise<StripeToken>;
}
