import { EventEmitter } from "@angular/core";
import { StripeInstance } from "../StripeTypes";
import { StripeScriptTag } from "../StripeScriptTag";
export declare class StripeComponent {
    StripeScriptTag: StripeScriptTag;
    catcher: EventEmitter<Error>;
    invalid: Error;
    invalidChange: EventEmitter<Error>;
    stripe: StripeInstance;
    constructor(StripeScriptTag: StripeScriptTag);
    ngOnInit(): void;
    init(): Promise<StripeInstance>;
}
