# stripe-angular
Angular to Stripe module containing useful providers, components, and directives

[demo page](https://ackerapple.github.io/stripe-angular)

[![hire me](https://ackerapple.github.io/resume/assets/images/hire-me-badge.svg)](https://ackerapple.github.io/resume/)
[![npm version](https://badge.fury.io/js/stripe-angular.svg)](http://badge.fury.io/js/stripe-angular)
[![npm downloads](https://img.shields.io/npm/dm/stripe-angular.svg)](https://npmjs.org/stripe-angular)
[![Build status](https://ci.appveyor.com/api/projects/status/djjqn1buycma3rwy/branch/master?svg=true)](https://ci.appveyor.com/project/AckerApple/stripe-angular/branch/master)
[![Build Status](https://travis-ci.org/AckerApple/stripe-angular.svg?branch=master)](https://travis-ci.org/AckerApple/stripe-angular)
[![Dependency Status](https://david-dm.org/ackerapple/stripe-angular.svg)](https://david-dm.org/ackerapple/stripe-angular)
[![min size](https://badgen.net/bundlephobia/min/stripe-angular)](https://bundlephobia.com/result?p=stripe-angular)
[![minzip size](https://badgen.net/bundlephobia/minzip/stripe-angular)](https://bundlephobia.com/result?p=stripe-angular)

### Table of Contents

- [Install](#install)
- [Inject](#inject)
  - [Async Inject](#async-inject)
- [Use](#use)
  - [stripe-card](#stripe-card)
  - [stripe-bank](#stripe-bank)
  - [stripe-source](#stripe-source)
- [Examples](#examples)

## Install
From a command terminal type the following
```
npm install stripe-angular @types/stripe-v3 --save
```

## Inject
Make stripe-angular available throughout your app

```typescript
import { NgModule } from "@angular/core";
import { StripeModule } from "stripe-angular"

@NgModule({
  imports: [ StripeModule.forRoot("...YOUR-STRIPE-KEY-HERE...") ]
}) export class AppModule {}
```

> Please note, you only use `.forRoot()` on your base app module
>> This ONLY matters if you need to support lazy loading via loadChildren()

**NOTE WORTHY**
Here are the operations preformed on construction on Stripe functionality
- Checking for window.Stripe existence
  - If undefined THEN script tag with src `https://js.stripe.com/v3/` is append to html head tag
- Set publishableKey in StripeJs library
- All stripe-angular components reuse the same initialized Stripe instance (Injector)

### Inject Async
The stripe key can be set asynchronously.

**Step 1**, In app.module.ts set key to empty string
```typescript
import { NgModule } from "@angular/core";
import { StripeModule } from "stripe-angular"

@NgModule({imports: [ StripeModule.forRoot("") ]}) export class AppModule {}
```

**Step 2**, Where you use Stripe elements, do a variation of this code below, according to your needs.
```typescript
import { StripeScriptTag } from "stripe-angular"

class Component {
  constructor(private stripeScriptTag: StripeScriptTag) {
    if (!this.stripeScriptTag.StripeInstance) {
      this.stripeScriptTag.setPublishableKey('');
    }
  }
}
```

## Capture Payment Method

The Payment Methods API replaces the existing Tokens and Sources APIs as the recommended way for integrations to collect and store payment information.

It is not longer recommended to use Stripe terminologies for "Source" and "Token". Use "Payment Method" instead.

[Read more here](https://stripe.com/docs/payments/payment-methods/transitioning)

## Use
A practical example to convert card data into a Stripe Payment Method

> Requires you to have already [initialized Stripe](#init)

```typescript
import { Component } from "@angular/core"

const template=
`
<div *ngIf="invalidError" style="color:red">
  {{ invalidError.message }}
</div>

<stripe-card #stripeCard
  (catch) = "onStripeError($event)"
  [(complete)] = "cardDetailsFilledOut"
  [(invalid)] = "invalidError"
  (cardMounted) = "cardCaptureReady = 1"
  (paymentMethodChange) = "setPaymentMethod($event)"
  (tokenChange) = "setStripeToken($event)"
  (sourceChange) = "setStripeSource($event)"
></stripe-card>

<button type="button" (click)="stripeCard.createPaymentMethod(extraData)">createPaymentMethod</button>
<button type="button" (click)="stripeCard.createSource(extraData)">createSource</button>
<button type="button" (click)="stripeCard.createToken(extraData)">createToken</button>
`

@Component({
  selector: "app-sub-page",
  template: template
}) export class AppComponent{
  cardCaptureReady = false

  onStripeInvalid( error: Error ){
    console.log('Validation Error', error)
  }

  onStripeError( error: Error ){
    console.error('Stripe error', error)
  }

  setPaymentMethod( token: stripe.paymentMethod.PaymentMethod ){
    console.log('Stripe Payment Method', token)
  }

  setStripeToken( token: stripe.Token ){
    console.log('Stripe Token', token)
  }

  setStripeSource( source: stripe.Source ){
    console.log('Stripe Source', source)
  }
}
```

### stripe-card
Builds a display for card intake and then helps tokenize those inputs

| Value | Description | Default |
| ------------- | ------------- | ------------- |
| token | `@Output` the generated token hash |  |
| invalid | `@Output` any invalid error |  |
| complete | `@Output` card details |  |
| options | [Card Element options](https://stripe.com/docs/js/elements_object/create_element?type=card#elements_create-options) | ElementsOptions |
| createOptions | [Elements options](https://stripe.com/docs/js/elements_object/create) | ElementsCreateOptions |
| tokenChange | `<EventEmitter>`token has been changed |  |
| invalidChange | `<EventEmitter>`invalid data has been changed |  |
| completeChange | `<EventEmitter>`details has been completed |  |
| cardMounted | `<EventEmitter>`card has been mounted |  |
| changed | `<EventEmitter>`details has been changed |  |
| catcher | `<EventEmitter>`catch any errors |  |

#### Examples

**stripe-card common example**

```html
<stripe-card #stripeCard
  [(token)]      = "token"
  (catch)        = "$event"
  (changed)      = "$event"
  [(invalid)]    = "invalidError"
  (cardMounted)  = "cardCaptureReady = 1"
></stripe-card>

<button type="button" (click)="stripeCard.createToken(extraData)">createToken</button>
```

**stripe-card token bindings**
```html
<stripe-card #stripeCard
  [(token)]     = "token"
  (tokenChange) = "$event"
></stripe-card>
<button type="button" (click)="stripeCard.createToken()">createToken</button>
```

### stripe-bank
Helps tokenize banking data. Does NOT include display inputs like stripe-card does.
[see stripe docs](https://stripe.com/docs/stripe-js/reference#collecting-bank-account-details)

| Value | Description | Default |
| ------------- | ------------- | ------------- |
| token | `@Output` the generated token hash |  |
| invalid | `@Output` any invalid error |  |
| options | [Card Element options](https://stripe.com/docs/js/elements_object/create_element?type=card#elements_create-options) | ElementsOptions |
| tokenChange | `<EventEmitter>`token has been changed |  |
| invalidChange | `<EventEmitter>`invalid data has been changed |  |
| catcher | `<EventEmitter>`catch any errors |  |

> For stripe-bank input fields, be sure to use the above mentioned link
>> Here is the most commonly used input fields:
```
country: "US",
currency: "usd",
routing_number: "110000000",
account_number: "000123456789",
account_holder_name: "Jenny Rosen",
account_holder_type: "individual"
```

#### Example

```html
<stripe-bank #stripeBank
  (catch)        = "$event"
  [(token)]      = "token"
  [(invalid)]    = "invalidError"
></stripe-card>

<button type="button" (click)="stripeBank.createToken({...bank_account...})">createToken</button>
```

### stripe-source

> This approach is not recommended any more and it is instead recommended to use the Payment Method terminology and functionality
>> [Documentation can be read here](https://stripe.com/docs/payments/payment-methods/transitioning)

| Value | Description | Default |
| ------------- | ------------- | ------------- |
| source | `@Output` the generated source hash |  |
| invalid | `@Output` any invalid error |  |
| paymentMethod | Reference to [Stripe Payment Method](https://stripe.com/docs/api/payment_methods/create) |  |
| sourceChange | `<EventEmitter>`source has been changed |  |
| invalidChange | `<EventEmitter>`invalid data has been changed |  |
| paymentMethodChange | `<EventEmitter>`payment method has been changed |  |
| catcher | `<EventEmitter>`catch any errors |  |

- [stripe sources docs](https://stripe.com/docs/sources)
- [best practices](https://stripe.com/docs/sources/best-practices)
- [api reference](https://stripe.com/docs/stripe-js/reference#stripe-create-source)

#### Example

**stripe-card source bindings**
```html
<stripe-card #stripeCard
  [(source)]    = "source"
  (sourceChange) = "$event"
></stripe-card>
<button type="button" (click)="stripeCard.createSource()">createSource</button>
```

### Another Examples

**stripe-card payment method bindings**
```html
<stripe-card #stripeCard
  (catch)               = "$event"
  (changed)             = "$event"
  [(invalid)]           = "invalidError"
  [(complete)]          = "cardDetailsFilledOut"
  (cardMounted)         = "cardCaptureReady = 1"
  [(paymentMethod)]     = "source"
  (paymentMethodChange) = "setPaymentMethod($event)"
></stripe-card>
<button type="button" (click)="stripeCard.createPaymentMethod()">createPaymentMethod</button>
```
