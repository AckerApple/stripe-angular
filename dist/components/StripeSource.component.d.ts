/// <reference types="stripe-v3" />
import { EventEmitter } from "@angular/core";
import { StripeScriptTag } from "../StripeScriptTag";
import { StripeComponent } from "./StripeComponent";
export declare class StripeSource extends StripeComponent {
    StripeScriptTag: StripeScriptTag;
    source?: stripe.Source;
    sourceChange: EventEmitter<stripe.Source>;
    paymentMethod?: stripe.paymentMethod.PaymentMethod;
    paymentMethodChange: EventEmitter<stripe.paymentMethod.PaymentMethod>;
    elements: any;
    constructor(StripeScriptTag: StripeScriptTag);
    createSource(extraData: {
        owner?: stripe.OwnerInfo;
        metadata?: any;
    }): Promise<stripe.Source | void>;
    processSourceResult(result: stripe.SourceResponse): stripe.Source | void;
    createPaymentMethod(extraData: {
        owner?: stripe.OwnerInfo;
        metadata?: any;
    }): Promise<stripe.paymentMethod.PaymentMethod | void>;
    processPaymentMethodResult(result: stripe.PaymentMethodResponse): stripe.paymentMethod.PaymentMethod | void;
}
