import { InjectionToken } from '@angular/core';

export const STRIPE_PUBLISHABLE_KEY = new InjectionToken<string>('Stripe Publishable Key')
export const STRIPE_OPTIONS = new InjectionToken<stripe.StripeOptions>('Stripe Options')

export interface Stripe{
  (string:string,options?:stripe.StripeOptions):stripe.Stripe
}

export interface BankAccountTokenOptions extends stripe.BankAccountTokenOptions {
  metadata?:Record<string, string>;
}