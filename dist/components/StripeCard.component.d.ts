import { ElementRef, EventEmitter } from "@angular/core";
import { Token, ElementsOptions } from "../StripeTypes";
import { StripeScriptTag } from "../StripeScriptTag";
import { StripeSource } from "./StripeSource.component";
export declare class StripeCard extends StripeSource {
    ElementRef: ElementRef;
    StripeScriptTag: StripeScriptTag;
    options: ElementsOptions;
    token: Token;
    tokenChange: EventEmitter<Token>;
    cardMounted: EventEmitter<any>;
    complete: boolean;
    completeChange: EventEmitter<boolean>;
    drawn: boolean;
    constructor(ElementRef: ElementRef, StripeScriptTag: StripeScriptTag);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    redraw(): void;
    createToken(extraData?: any): Promise<Token>;
}
