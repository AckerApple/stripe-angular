# stripe-angular
Angular to Stripe module containing useful providers, components, and directives

[demo page](https://ackerapple.github.io/stripe-angular)

[![npm version](https://badge.fury.io/js/stripe-angular.svg)](http://badge.fury.io/js/stripe-angular)
[![npm downloads](https://img.shields.io/npm/dm/stripe-angular.svg)](https://npmjs.org/stripe-angular)
[![Build status](https://ci.appveyor.com/api/projects/status/sq815bogrtky29b8/branch/development?svg=true)](https://ci.appveyor.com/project/AckerApple/stripe-angular/branch/development)
[![Build Status](https://travis-ci.org/AckerApple/stripe-angular.svg?branch=development)](https://travis-ci.org/AckerApple/stripe-angular)
[![Dependency Status](https://david-dm.org/ackerapple/stripe-angular.svg)](https://david-dm.org/ackerapple/stripe-angular)


<details>
  <summary>Table of Contents</summary>

- [Install](#install)
- [Inject](#inject)
- [Init](#init)
- [Use](#use)

</details>

## Install
From a command terminal type the following
```
npm install stripe-angular --save-dev
```

## Inject
Make stripe-angular available throughout your app

```typescript
import { NgModule } from "@angular/core";
import { Module as StripeModule } from "stripe-angular"

@NgModule({
  imports: [ StripeModule ]
}) export class AppModule {}
```

## Init
You must provide your Stripe account's publishableKey

```typescript
import { Component } from "@angular/core"
import { StripeScriptTag } from "stripe-angular"

@Component({
  selector: "app",
  template: template
}) export class AppComponent{
  private publishableKey:string = "...YOUR-STRIPE-KEY-HERE..."

  constructor(public StripeScriptTag:StripeScriptTag){
    this.StripeScriptTag.setPublishableKey( this.publishableKey )
  }
}
```

> StripeScriptTag.setPublishableKey performs 3 operations
>> 1. Checks for window.Stripe
>>> 1.1 If undefined, head tag is found and script tag with src "https://js.stripe.com/v3/" is added
>> 2. Sets publishableKey in StripeJs library
>> 3. All stripe-angular components use the initialized Stripe instance


## Use
A practical example to convert card data into a Stripe token

> Requires you to have already [initialized Stripe](#init)

```typescript
import { Component } from "@angular/core"
import { StripeToken } from "stripe-angular"

const template=
`
<stripe-card
  #stripeCard
  (catch)   = "onStripeError($event)"
  (tokenChange) = "setStripeToken($event)"
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

  setStripeToken( token:StripeToken ){
    console.log('Stripe token', token)
  }

  onStripeError( error:Error ){
    console.error('Stripe error', token)
  }
}
```