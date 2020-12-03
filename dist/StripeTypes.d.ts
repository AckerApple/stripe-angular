import { InjectionToken } from '@angular/core';
export declare const STRIPE_PUBLISHABLE_KEY: InjectionToken<string>;
export declare const STRIPE_OPTIONS: InjectionToken<StripeInstanceOptions>;
export interface Stripe {
    (string: string, options?: StripeInstanceOptions): StripeInstance;
}
export interface StripeInstance {
    elements(options?: elements.ElementsCreateOptions): elements.Elements;
    createToken(element: elements.Element, options?: TokenOptions | BankAccountTokenOptions): Promise<TokenResponse>;
    createToken(name: 'bank_account', options: BankAccountTokenOptions): Promise<TokenResponse>;
    createToken(name: 'pii', options: PiiTokenOptions): Promise<TokenResponse>;
    createSource(element: elements.Element, options?: {
        owner?: OwnerInfo;
        metadata?: Metadata;
    }): Promise<SourceResponse>;
    createSource(options: SourceOptions): Promise<SourceResponse>;
    retrieveSource(options: RetrieveSourceOptions): Promise<SourceResponse>;
    createPaymentMethod(type: paymentMethod.paymentMethodType, element: elements.Element, options?: CreatePaymentMethodOptions): Promise<PaymentMethodResponse>;
    createPaymentMethod(data: PaymentMethodData): Promise<PaymentMethodResponse>;
}
export interface StripeInstanceOptions {
    stripeAccount?: string;
}
export interface StripeCard {
    id: string;
    object: "card" | string;
    name: string;
    address_city: string;
    address_country: string;
    address_line1: string;
    address_line1_check: string;
    address_line2: string;
    address_state: string;
    address_zip: string;
    address_zip_check: string;
    brand: string;
    country: string;
    cvc_check: string;
    dynamic_last4: string;
    exp_month: number;
    exp_year: number;
    funding: string;
    last4: string;
    metadata: Metadata;
    tokenization_method: any;
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
export interface ElementsOptions {
    classes?: {
        base?: string;
        complete?: string;
        empty?: string;
        focus?: string;
        invalid?: string;
        webkitAutofill?: string;
    };
    hidePostalCode?: boolean;
    hideIcon?: boolean;
    showIcon?: boolean;
    iconStyle?: 'solid' | 'default';
    placeholder?: string;
    placeholderCountry?: string;
    style?: {
        base?: Style;
        complete?: Style;
        empty?: Style;
        invalid?: Style;
        paymentRequestButton?: PaymentRequestButtonStyleOptions;
    };
    value?: string | {
        [objectKey: string]: string;
    };
    supportedCountries?: string[];
    disabled?: boolean;
}
interface Style extends StyleOptions {
    ':hover'?: StyleOptions;
    ':focus'?: StyleOptions;
    '::placeholder'?: StyleOptions;
    '::selection'?: StyleOptions;
    ':-webkit-autofill'?: StyleOptions;
    ':disabled'?: StyleOptions;
    '::-ms-clear'?: StyleOptions;
}
interface StyleOptions {
    color?: string;
    backgroundColor?: string;
    fontFamily?: string;
    fontSize?: string;
    fontSmoothing?: string;
    fontStyle?: string;
    fontVariant?: string;
    fontWeight?: string | number;
    iconColor?: string;
    lineHeight?: string;
    letterSpacing?: string;
    textAlign?: string;
    textDecoration?: string;
    textShadow?: string;
    textTransform?: string;
}
interface PaymentRequestButtonStyleOptions {
    type?: 'default' | 'donate' | 'buy';
    theme: 'dark' | 'light' | 'light-outline';
    height: string;
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
interface PiiTokenOptions {
    personal_id_number: string;
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
interface TokenOptions {
    name?: string;
    address_line1?: string;
    address_line2?: string;
    address_city?: string;
    address_state?: string;
    address_zip?: string;
    address_country?: string;
    currency?: string;
}
interface RetrieveSourceOptions {
    id: string;
    client_secret: string;
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
declare namespace elements {
    interface ElementsCreateOptions {
        fonts?: Font[];
        locale?: string;
    }
    type handler = (response?: ElementChangeResponse) => void;
    type eventTypes = 'blur' | 'change' | 'focus' | 'ready';
    interface Element {
        mount(domElement: any): void;
        on(event: eventTypes, handler: handler): void;
        on(event: 'click', handler: (response: {
            preventDefault: () => void;
        }) => void): void;
        addEventListener(event: eventTypes, handler: handler): void;
        addEventListener(event: 'click', handler: (response: {
            preventDefault: () => void;
        }) => void): void;
        focus(): void;
        blur(): void;
        clear(): void;
        unmount(): void;
        destroy(): void;
        update(options: ElementsOptions): void;
    }
    interface ElementChangeResponse {
        elementType: string;
        brand: string;
        complete: boolean;
        empty: boolean;
        value?: {
            postalCode: string | number;
        } | string;
        country?: string;
        bankName?: string;
        error?: Error;
    }
    interface ElementOptions {
        fonts?: Font[];
        locale?: string;
    }
    type elementsType = 'card' | 'cardNumber' | 'cardExpiry' | 'cardCvc' | 'postalCode' | 'paymentRequestButton' | 'iban' | 'idealBank';
    interface Elements {
        create(type: elementsType, options?: ElementsOptions): Element;
        getElement(type: elementsType): Element | null;
    }
    interface ElementsOptions {
        classes?: {
            base?: string;
            complete?: string;
            empty?: string;
            focus?: string;
            invalid?: string;
            webkitAutofill?: string;
        };
        hidePostalCode?: boolean;
        hideIcon?: boolean;
        showIcon?: boolean;
        iconStyle?: 'solid' | 'default';
        placeholder?: string;
        placeholderCountry?: string;
        style?: {
            base?: Style;
            complete?: Style;
            empty?: Style;
            invalid?: Style;
            paymentRequestButton?: PaymentRequestButtonStyleOptions;
        };
        value?: string | {
            [objectKey: string]: string;
        };
        supportedCountries?: string[];
        disabled?: boolean;
    }
    interface Style extends StyleOptions {
        ':hover'?: StyleOptions;
        ':focus'?: StyleOptions;
        '::placeholder'?: StyleOptions;
        '::selection'?: StyleOptions;
        ':-webkit-autofill'?: StyleOptions;
        ':disabled'?: StyleOptions;
        '::-ms-clear'?: StyleOptions;
    }
    interface Font {
        family?: string;
        src?: string;
        display?: string;
        style?: string;
        unicodeRange?: string;
        weight?: string;
        cssSrc?: string;
    }
    interface StyleOptions {
        color?: string;
        backgroundColor?: string;
        fontFamily?: string;
        fontSize?: string;
        fontSmoothing?: string;
        fontStyle?: string;
        fontVariant?: string;
        fontWeight?: string | number;
        iconColor?: string;
        lineHeight?: string;
        letterSpacing?: string;
        textAlign?: string;
        textDecoration?: string;
        textShadow?: string;
        textTransform?: string;
    }
    interface PaymentRequestButtonStyleOptions {
        type?: 'default' | 'donate' | 'buy';
        theme: 'dark' | 'light' | 'light-outline';
        height: string;
    }
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
declare namespace paymentMethod {
    export type paymentMethodType = 'card' | 'card_present';
    export interface PaymentMethod {
        /**
         * The unique identifier for the object
         */
        id: string;
        /**
         * Value is "payment_method"
         */
        object: 'payment_method';
        /**
         * Billing information associated with the PaymentMethod that may be
         * used or required by particular types of payment methods.
         */
        billing_details: BillingDetails;
        /**
         * If this is a card PaymentMethod, this hash contains details about the card.
         */
        card?: PaymentMethodCard;
        /**
         * If this is an card_present PaymentMethod, this hash contains details
         * about the Card Present payment method.
         */
        card_present?: any;
        /**
         * Time at which the object was created. Measured in seconds since the
         * Unix epoch.
         */
        created: number;
        /**
         * The ID of the Customer to which this PaymentMethod is saved.
         * This will not be set when the PaymentMethod has not been saved to a Customer.
         */
        customer: string | null;
        /**
         * Has the value true if the object exists in live mode or the value
         * false if the object exists in test mode.
         */
        livemode: boolean;
        metadata: Metadata;
        /**
         * The type of the PaymentMethod. An additional hash is included on the
         * PaymentMethod with a name matching this value. It contains additional
         * information specific to the PaymentMethod type.
         */
        type: string;
    }
    type paymentMethodCardBrand = 'amex' | 'diners' | 'discover' | 'jcb' | 'mastercard' | 'unionpay' | 'visa' | 'unknown';
    interface PaymentMethodCard {
        /**
         * Card brand
         */
        brand: paymentMethodCardBrand;
        /**
         * Checks on Card address and CVC if provided.
         */
        checks: {
            address_line1_check: boolean | null;
            address_postal_code_check: boolean | null;
            cvc_check: boolean | null;
        };
        /**
         * Two-letter ISO code representing the country of the card. You
         * could use this attribute to get a sense of the international
         * breakdown of cards you’ve collected.
         */
        country: string;
        /**
         * Two-digit number representing the card’s expiration month.
         */
        exp_month: number;
        /**
         * Four-digit number representing the card’s expiration year.
         */
        exp_year: number;
        /**
         * Uniquely identifies this particular card number. You can use
         * this attribute to check whether two customers who’ve signed
         * up with you are using the same card number, for example.
         */
        fingerprint: string;
        /**
         * Card funding type
         */
        funding: fundingType;
        /**
         * Details of the original PaymentMethod that created this object.
         */
        generated_from: {
            charge?: string | null;
            payment_method_details?: PaymentMethodDetails | null;
        };
        /**
         * The last four digits of the card.
         */
        last4: string;
        /**
         * Contains details on how this Card maybe be used for 3D Secure authentication.
         */
        three_d_secure_usage?: {
            supported?: boolean;
        };
        /**
         * If this Card is part of a card wallet, this contains the details of
         * the card wallet.
         */
        wallet: {
            type: 'amex_express_checkout' | 'apple_pay' | 'google_pay' | 'masterpass' | 'samsung_pay' | 'visa_checkout';
            amex_express_checkout?: any;
            apple_pay?: any;
            dynamic_last4?: any;
            google_pay?: any;
            masterpass?: any;
            samsung_pay?: any;
            visa_checkout?: any;
        } | null;
    }
    /**
     * Details about the payment method at the time of the transaction.
     */
    interface PaymentMethodDetails {
        /**
         * The type of transaction-specific details of the payment method used in the payment
         */
        type: 'ach_credit_transfer' | 'ach_debit' | 'alipay' | 'bancontact' | 'card' | 'eps' | 'giropay' | 'ideal' | 'multibanco' | 'p24' | 'sepa_debit' | 'sofort' | 'stripe_account' | 'wechat';
        ach_credit_transfer?: AchCreditTransferDetails | null;
        ach_debit?: AchDebitDetails | null;
        alipay?: any | null;
        bancontact?: BanContactDetails | null;
        card?: PaymentMethodCard | null;
        eps?: EpsDetails | null;
        giropay?: GiropayDetails | null;
        ideal?: IdealDetails | null;
        multibanco?: MultibancoDetails | null;
        p24?: P24Details | null;
        sepa_debit?: SepaDebitDetails | null;
        sofort?: SofortDetails | null;
        stripe_account?: any | null;
        wechat?: any | null;
    }
    interface AchCreditTransferDetails {
        account_number: string;
        bank_name: string;
        routing_number: string;
        swift_coode: string;
    }
    interface AchDebitDetails {
        account_holder_type: 'individual' | 'company';
        bank_name: string;
        country: string;
        fingerprint: string;
        last4: string;
        routing_number: string;
    }
    interface BanContactDetails {
        bank_code: string;
        bank_name: string;
        bic: string;
        iban_last4: string;
        preferred_language: 'en' | 'de' | 'fr' | 'nl';
        verified_name: string;
    }
    interface EpsDetails {
        verified_name: string;
    }
    interface GiropayDetails {
        bank_code: string;
        bank_name: string;
        bic: string;
        verified_name: string;
    }
    interface IdealDetails {
        bank: 'abn_amro' | 'asn_bank' | 'bunq' | 'handelsbanken' | 'ing' | 'knab' | 'moneyou' | 'rabobank' | 'regiobank' | 'sns_bank' | 'triodos_bank' | 'van_lanschot';
        bic: string;
        iban_last4: string;
        verified_name: string;
    }
    interface MultibancoDetails {
        entity: string;
        reference: string;
    }
    interface P24Details {
        reference: string;
        verified_name: string;
    }
    interface SepaDebitDetails {
        bank_code: string;
        branch_code: string;
        country: string;
        fingerprint: string;
        last4: string;
    }
    interface SofortDetails {
        bank_code: string;
        bank_name: string;
        bic: string;
        country: string;
        iban_last4: string;
        verified_name: string;
    }
    export {};
}
interface BillingDetailsAddress {
    city?: string;
    country?: string;
    line1?: string;
    line2?: string;
    postal_code?: string;
    state?: string;
}
interface BillingDetails {
    address?: BillingDetailsAddress | null;
    email?: string | null;
    name?: string | null;
    phone?: string | null;
}
/**
 * A set of key/value pairs that you can attach to an object. It can be useful for storing
 * additional information about the object in a structured format.
 */
export interface Metadata {
    [x: string]: string;
}
interface CreatePaymentMethodOptions {
    /**
     * Billing information associated with the PaymentMethod
     * that may be used or required by particular types of
     * payment methods.
     */
    billing_details?: BillingDetails;
    metadata?: Metadata;
}
interface PaymentMethodResponse {
    paymentMethod?: paymentMethod.PaymentMethod;
    error?: Error;
}
export {};
