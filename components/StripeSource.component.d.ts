import { EventEmitter } from "@angular/core";
import { StripeToken, StripeSource as StripeSourceType } from "../StripeTypes";
import { StripeScriptTag } from "../StripeScriptTag";
import { StripeComponent } from "./StripeComponent";
export declare class StripeSource extends StripeComponent {
    StripeScriptTag: StripeScriptTag;
    source: StripeSourceType;
    sourceChange: EventEmitter<StripeSourceType>;
    elements: any;
    constructor(StripeScriptTag: StripeScriptTag);
    createSource(): Promise<StripeToken>;
}
