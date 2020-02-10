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
  - [Use](#use)
    - [stripe-card](#stripe-card)
    - [stripe-bank](#stripe-bank)
    - [stripe-source](#stripe-source)

## Install
From a command terminal type the following
```
npm install stripe-angular --save
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

> Three operations are preformed on construction
>> 1. Checking for window.Stripe
>>> 1.1 If undefined, head tag is found and script tag with src "https://js.stripe.com/v3/" is added
>> 2. Seting publishableKey in StripeJs library
>> 3. All stripe-angular components use the initialized Stripe instance


## Use
A practical example to convert card data into a Stripe token

> Requires you to have already [initialized Stripe](#init)

```typescript
import { Component } from "@angular/core"
import { StripeToken } from "stripe-angular"

const template=
`
<div *ngIf="invalidError" style="color:red">
  {{ invalidError.message }}
</div>

<stripe-card
  #stripeCard
  (catch) = "onStripeError($event)"
  [(invalid)] = "invalidError"
  (tokenChange) = "setStripeToken($event)"
  (sourceChange) = "setStripeSource($event)"
></stripe-card>

<button type="button" (click)="stripeCard.createToken(extraData)">createToken</button>
`

@Component({
  selector: "app-sub-page",
  template: template
}) export class AppComponent{
  extraData = {
    "name": null
    "address_city": null
    "address_line1": null
    "address_line2": null
    "address_state": null
    "address_zip": null
  }

  onStripeInvalid( error:Error ){
    console.log('Validation Error', error)
  }

  setStripeToken( token:StripeToken ){
    console.log('Stripe token', token)
  }

  setStripeSource( source:StripeSource ){
    console.log('Stripe source', source)
  }

  onStripeError( error:Error ){
    console.error('Stripe error', token)
  }
}
```

### stripe-card
Builds a display for card intake and then helps tokenize those inputs

```html
<stripe-card #stripeCard
  (catch)        = "$event"
  [(token)]      = "token"
  [(invalid)]    = "invalidError"
></stripe-card>

<button type="button" (click)="stripeCard.createToken(extraData)">createToken</button>
```

### stripe-bank
Helps tokenize banking data. Does NOT include display inputs like stripe-card does.

[see stripe docs](https://stripe.com/docs/stripe-js/reference#collecting-bank-account-details)
```html
<stripe-bank #stripeBank
  (catch)        = "$event"
  [(token)]      = "token"
  [(invalid)]    = "invalidError"
></stripe-card>

<button type="button" (click)="stripeBank.createToken({...bank_account...})">createToken</button>
```

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

### stripe-source
This component is not intended to stand alone but it could. Component stripe-card extends stripe-source.

- [stripe sources docs](https://stripe.com/docs/sources)
- [best practices](https://stripe.com/docs/sources/best-practices)
- [api reference](https://stripe.com/docs/stripe-js/reference#stripe-create-source)

```html
<!-- stripe source not intended to stand alone like this -->
<stripe-source #stripeSource
  (catch)     = "$event"
  [(source)]  = "source"
  [(invalid)] = "invalidError"
></stripe-card>
<button type="button" (click)="stripeSource.createSource()">createSource</button>

<!-- stripe-card has source bindings -->
<stripe-card #stripeCard
  (catch)     = "$event"
  [(source)]  = "source"
  [(invalid)] = "invalidError"
></stripe-card>
<button type="button" (click)="stripeCard.createSource()">createSource</button>
```

What is a Stripe source?
> Source objects allow you to accept a variety of payment methods with a single API. A source represents a customer’s payment instrument, and can be used with the Stripe API to create payments. Sources can be charged directly, or attached to customers for later reuse.

Why use Stripe sources?
> Stripe sources allows you, the developer, to focus on data differences between payment formats instead using different components for each like stripe-card and stripe-bank
>> By taking into consideration the flexibility of the Sources API when designing your checkout flow, you can minimize any changes required to support additional payment methods as you add them.
