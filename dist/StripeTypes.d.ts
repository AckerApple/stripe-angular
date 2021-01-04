/// <reference types="stripe-v3" />
import { InjectionToken } from '@angular/core';
export declare const STRIPE_PUBLISHABLE_KEY: InjectionToken<string>;
export declare const STRIPE_OPTIONS: InjectionToken<stripe.StripeOptions>;
export interface Stripe {
    (string: string, options?: stripe.StripeOptions): stripe.Stripe;
}
export interface BankAccountTokenOptions extends stripe.BankAccountTokenOptions {
    metadata?: Record<string, string>;
}
