/// <reference types="stripe-v3" />
import { InjectionToken } from '@angular/core';
export declare const STRIPE_PUBLISHABLE_KEY: InjectionToken<string>;
export declare const STRIPE_OPTIONS: InjectionToken<stripe.StripeOptions>;
export interface Stripe {
    (string: string, options?: stripe.StripeOptions): stripe.Stripe;
}
export interface BankAccountTokenOptions {
    /**
     * Two character country code (e.g., US).
     */
    country: string;
    /**
     * Three character currency code (e.g., usd).
     */
    currency: string;
    /**
     * The bank routing number (e.g., 111000025). Optional if the currency is eur, as the account number is an IBAN.
     */
    routing_number?: string;
    /**
     * The bank account number (e.g., 000123456789).
     */
    account_number: string;
    /**
     * The name of the account holder.
     */
    account_holder_name: string;
    /**
     * The type of entity that holds the account. Can be either individual or company.
     */
    account_holder_type: 'individual' | 'company';
    metadata?: Metadata;
}
export interface SourceOptions {
    type: 'ach_credit_transfer' | 'ach_debit' | 'alipay' | 'bancontact' | 'card' | 'card_present' | 'eps' | 'giropay' | 'ideal' | 'multibanco' | 'klarna' | 'p24' | 'sepa_debit' | 'sofort' | 'three_d_secure' | 'wechat' | string;
    flow?: 'redirect' | 'receiver' | 'code_verification' | 'none';
    sepa_debit?: {
        iban: string;
    };
    currency?: string;
    amount?: number;
    owner?: OwnerInfo;
    mandate?: SourceMandate;
    metadata?: Metadata;
    statement_descriptor?: string;
    redirect?: {
        return_url: string;
    };
    token?: string;
    usage?: 'reusable' | 'single_use';
    three_d_secure?: {
        card: string;
    };
    sofort?: {
        country: string;
        preferred_language?: 'de' | 'en' | 'es' | 'it' | 'fr' | 'nl' | 'pl';
    };
}
export interface OwnerInfo {
    address?: OwnerAddress;
    name?: string;
    email?: string;
    phone?: string;
}
interface OwnerAddress {
    city?: string;
    country?: string;
    line1?: string;
    line2?: string;
    postal_code?: string;
    state?: string;
}
export interface TokenResponse {
    token?: Token;
    error?: Error;
}
export interface Token {
    id: string;
    object: string;
    bank_account?: BankAccount;
    card?: Card;
    client_ip: string;
    created: number;
    livemode: boolean;
    type: string;
    used: boolean;
}
export interface StripeToken extends Token {
}
declare type statusType = 'new' | 'validated' | 'verified' | 'verification_failed' | 'errored';
interface BankAccount {
    id: string;
    object: string;
    account_holder_name: string;
    account_holder_type: string;
    bank_name: string;
    country: string;
    currency: string;
    fingerprint: string;
    last4: string;
    routing_number: string;
    status: statusType;
}
declare type brandType = 'Visa' | 'American Express' | 'MasterCard' | 'Discover' | 'JCB' | 'Diners Club' | 'Unknown';
declare type checkType = 'pass' | 'fail' | 'unavailable' | 'unchecked';
declare type fundingType = 'credit' | 'debit' | 'prepaid' | 'unknown';
declare type tokenizationType = 'apple_pay' | 'android_pay';
interface Card {
    id: string;
    object: string;
    address_city?: string;
    address_country?: string;
    address_line1?: string;
    address_line1_check?: checkType;
    address_line2?: string;
    address_state?: string;
    address_zip?: string;
    address_zip_check?: checkType;
    brand: brandType;
    country: string;
    currency?: string;
    cvc_check?: checkType;
    dynamic_last4: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: fundingType;
    last4: string;
    metadata: Metadata;
    name?: string;
    tokenization_method?: tokenizationType;
    three_d_secure?: 'required' | 'recommended' | 'optional' | 'not_supported';
}
export interface SourceResponse {
    source?: Source;
    error?: Error;
}
export interface Source {
    client_secret: string;
    created: number;
    currency: string;
    id: string;
    owner: {
        address: OwnerAddress | null;
        email: string | null;
        name: string | null;
        phone: string | null;
        verified_address: string | null;
        verified_email: string | null;
        verified_name: string | null;
        verified_phone: string | null;
    };
    sepa_debit?: {
        bank_code: string | null;
        country: string | null;
        fingerprint: string;
        last4: string;
        mandate_reference: string;
    };
    card?: Card;
    status?: string;
    redirect?: {
        status: string;
        url: string;
    };
    three_d_secure?: {
        authenticated: boolean;
    };
}
interface OfflineAcceptanceMandate {
    contact_email: string;
}
interface OnlineAcceptanceMandate {
    date: number;
    ip: string;
    user_agent: string;
}
interface SourceMandateAcceptance {
    date: number;
    status: 'accepted' | 'refused';
    ip?: string;
    offline?: OfflineAcceptanceMandate;
    online?: OnlineAcceptanceMandate;
    type?: 'online' | 'offline';
    user_agent?: string;
}
interface SourceMandate {
    acceptance?: SourceMandateAcceptance;
    amount?: number;
    currency?: string;
    interval?: 'one_time' | 'scheduled' | 'variable';
    notification_method?: 'email' | 'manual' | 'none';
}
/**
 * A set of key/value pairs that you can attach to an object. It can be useful for storing
 * additional information about the object in a structured format.
 */
export interface Metadata {
    [x: string]: string;
}
export {};
