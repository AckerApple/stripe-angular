export interface Stripe {
    (string: any, options?: any): StripeInstance;
}
export interface StripeInstance {
    elements: (options?: any) => any;
    createToken: (elements: any, options?: any) => any;
    createSource: () => any;
    retrieveSource: () => any;
    paymentRequest: () => any;
}
export interface StripeCard {
    "id": string;
    "object": "card" | string;
    "name": string;
    "address_city": string;
    "address_country": string;
    "address_line1": string;
    "address_line1_check": string;
    "address_line2": string;
    "address_state": string;
    "address_zip": string;
    "address_zip_check": string;
    "brand": string;
    "country": string;
    "cvc_check": string;
    "dynamic_last4": string;
    "exp_month": number;
    "exp_year": number;
    "funding": string;
    "last4": string;
    "metadata": any;
    "tokenization_method": any;
}
export interface StripeToken {
    "id": string;
    "object": string;
    "card": StripeCard;
    "client_ip": string;
    "created": number;
    "livemode": boolean;
    "type": "card" | string;
    "used": boolean;
}
export interface StripeStyle {
    color: string;
    fontFamily: string;
    fontSize: string;
    fontSmoothing: string;
    fontStyle: string;
    fontVariant: string;
    iconColor: string;
    lineHeight: string;
    letterSpacing: string;
    textAlign: string;
    textDecoration: string;
    textShadow: string;
    textTransform: string;
}
export interface StripeStyling {
    base: StripeStyle;
    complete: StripeStyle;
    empty: StripeStyle;
    invalid: StripeStyle;
}
export interface StripeClasses {
    base: string;
    complete: string;
    empty: string;
    focus: string;
    invalid: string;
    webkitAutofill: string;
}
export interface StripeCardOptions {
    classes: StripeClasses;
    hidePostalCode: boolean;
    hideIcon: boolean;
    iconStyle: string;
    placeholder: string;
    style: StripeStyling;
}
