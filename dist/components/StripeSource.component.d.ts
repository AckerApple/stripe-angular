import { EventEmitter } from "@angular/core";
import { SourceResponse, Source, OwnerInfo } from "../StripeTypes";
import { StripeScriptTag } from "../StripeScriptTag";
import { StripeComponent } from "./StripeComponent";
export declare class StripeSource extends StripeComponent {
    StripeScriptTag: StripeScriptTag;
    source?: Source;
    sourceChange: EventEmitter<Source>;
    elements: any;
    constructor(StripeScriptTag: StripeScriptTag);
    createSource(extraData: {
        owner?: OwnerInfo;
        metadata?: any;
    }): Promise<Source | void>;
    processSourceResult(result: SourceResponse): Source | void;
}
