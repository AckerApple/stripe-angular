import { Component } from "@angular/core"
import { string as demoTemplate } from "./templates/app.component.template"

//DEMO REFERENCE TO stripe-angular . USE BELOW
import {
  StripeInstance, Stripe, StripeScriptTag
} from "../../../src/index"
import * as packageJson from "../../../package.json"

//YOUR REFERENCE TO stripe-angular
//import { Stripe, StripeScriptTag } from "stripe-angular"

const template=
`
<table *ngIf="!viewcode" cellPadding="0" cellSpacing="0" border="0" style="width:100%;height:100%">
  <tr>
    <td>
      <div style="text-align:center;">
        <div style="border-radius:5px;background-color:#888;display:inline-block;text-align:left;width:100%;max-width:400px;">
          <div style="padding:1em;">
            <h2 style="margin-top:0;">stripe-angular {{version}} demo</h2>
            <ng-container *ngIf="!loaded">Loading...</ng-container>

            <ng-container *ngIf="loaded">

              <div *ngIf="changekey" style="padding:1em;">
                <form onsubmit="return false" (submit)="apply(tempPublishableKey);changekey=false">
                  <strong>publishableKey</strong>
                  <div>
                    <input (keyup)="tempPublishableKey=$event.target.value" [value]="tempPublishableKey" style="width:100%" />
                  </div>
                  <button type="submit">apply</button>
                </form>
              </div>


              <div *ngIf="!changekey" style="padding:1em;">
                <strong>publishableKey</strong>
                <div>{{ publishableKey }}</div>

                <br />

                <button type="button" (click)="changekey=!changekey" style="width:100%">CHANGE PUBLISHABLE KEY</button>

                <ng-container *ngIf="publishableKey=='pk_test_5JZuHhxsinNGc5JanVWWKSKq'">
                  <br />
                  <br />
                  <div style="font-size:0.75em;color:orange;">
                    <strong>WARNING</strong>: You need to enter your own key above.
                    <p>
                      You will NOT be able to perform any additional functionality without doing so. <a href="https://dashboard.stripe.com/register" target="_blank">create account</a>
                    </p>
                  </div>
                </ng-container>

                <br />
                <hr />

                <ng-container *ngIf="stripe">
                  <label for="card-like-element">
                    <small style="float:right">
                      <a href="https://stripe.com/docs/testing#cards" target="_blank">demo card nums</a>
                    </small>
                    Credit or debit card
                  </label>
                  <div id="card-like-element" style="background-color:white;border-radius: 5px;border:1px solid #DDD;padding:.33em;">
                    <stripe-card
                      #stripeCard
                      [(token)]="token"
                      [(source)]="source"
                      (tokenChange)="sending=false"
                      (catch)="sending=false;lastError=$event"
                      (invalidChange)="sending=false;lastError=$event"
                      (cardMounted) = "log('card mounted')"
                    ></stripe-card>
                  </div>

                  <div *ngIf="editRequest">
                    <br />
                    <strong><a href="https://stripe.com/docs/api/sources" target="_blank">source data</a></strong>
                    <textarea wrap="off" style="width:100%;height:175px" (change)="changeRequest($event.target.value)">{{ request | json }}</textArea>
                  </div>

                  <br />

                  <div style="text-align:right;display:flex;flex-wrap:wrap;">
                    <button
                      type="button"
                      (click)="editRequest=!editRequest"
                      style="flex-grow:1"
                    >
                      source data
                    </button>
                    <button
                      type="button"
                      (click)="lastError=null;sending=true;stripeCard.createSource(request)"
                      style="flex-grow:1"
                    >
                      createSource
                    </button>
                  </div>

                  <br />

                  <div *ngIf="editExtraData">
                    <br />
                    <strong title="Card specific way of providing token related info (includes metadata)">
                      <a href="https://stripe.com/docs/api/tokens" target="_blank">token data</a>
                    </strong>
                    <textarea wrap="off" style="width:100%;height:175px" (change)="changeExtraData($event.target.value)">{{ extraData | json }}</textArea>
                  </div>

                  <div style="text-align:right;display:flex;flex-wrap:wrap;">
                    <button
                      type="button"
                      (click)="editExtraData=!editExtraData"
                      style="flex-grow:1"
                    >
                      token data
                    </button>
                    <button
                      type="button"
                      (click)="lastError=null;sending=true;stripeCard.createToken(extraData)"
                      style="flex-grow:1"
                    >
                      createToken
                    </button>
                  </div>

                  <br />

                  <div *ngIf="token" style="padding:1em;">
                    <strong>Token</strong>
                    <textarea wrap="off" style="width:100%;height:175px">{{ token | json }}</textArea>
                  </div>

                  <div *ngIf="source" style="padding:1em;">
                    <strong>Source</strong>
                    <textarea wrap="off" style="width:100%;height:175px">{{ source | json }}</textArea>
                  </div>
                  <hr />

                  <label for="card-like-element">
                    Bank Account
                  </label>
                  <stripe-bank #stripeBank [(token)]="bankToken" (tokenChange)="sending=false" (catch)="sending=false;lastError=$event" (invalidChange)="sending=false;lastError=$event"></stripe-bank>
                  <br />
                  <textarea wrap="off" style="width:100%;height:175px" (change)="changeBankData($event.target.value)">{{ bankData | json }}</textArea>
                  <br />
                  <div style="text-align:right;">
                    <button type="button" (click)="lastError=null;sending=true;stripeBank.createToken(bankData)">createToken</button>
                  </div>
                  <!--
                  <br />
                  <div style="text-align:right;">
                    <button type="button" (click)="lastError=null;sending=true;stripeBank.createSource()">createSource</button>
                  </div>
                  -->

                  <!-- bank token success output -->
                  <div *ngIf="bankToken" style="padding:1em;">
                    <strong>Bank Token</strong>
                    <textarea wrap="off" style="width:100%;height:175px">{{ bankToken | json }}</textArea>
                  </div>
                  <div *ngIf="bankSource" style="padding:1em;">
                    <strong>Bank Source</strong>
                    <textarea wrap="off" style="width:100%;height:175px">{{ bankSource | json }}</textArea>
                  </div>

                </ng-container>

                <ng-container *ngIf="sending">
                  <div>
                    Sending to Stripe...
                  </div>
                </ng-container>

                <div *ngIf="lastError" style="color:red;">
                  <textarea wrap="off" style="color:red;width:100%;height:175px">{{lastError | json}}</textArea>
                </div>

                <div *ngIf="!stripe" style="color:red;">
                  Stripe publishable key has not yet been set
                </div>

              </div>
            </ng-container>
            <br />
            <div style="text-align:center;display:flex;justify-content: center;">
              <button
                type="button"
                (click)="viewcode=true"
                style="flex-grow:1"
              >view code</button>
              <a
                href="https://github.com/AckerApple/stripe-angular/blob/master/app/src/components/app.component.ts"
                target="_blank" style="flex-grow:1"
              >demo code on github</a>
              <a
                href="https://stripe.com/docs/error-codes"
                target="_blank" style="flex-grow:1"
              >error-codes</a>
            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
</table>
<table *ngIf="viewcode" cellPadding="0" cellSpacing="0" border="0" style="width:100%;height:100%">
  <tbody>
    <tr>
      <td style="width:100%;height:100%"><textarea wrap="off" style="width:100%;height:100%">{{ demoTemplate }}</textarea></td>
    </tr>
    <tr style="height:30px;">
      <td style="text-align:center;">
        <button type="button" (click)="viewcode=false" style="width:100%;height:100%">hide code</button>
      </td>
    </tr>
  </tbody>
</table>
`

const testKey = "pk_test_5JZuHhxsinNGc5JanVWWKSKq"

@Component({
  selector:"app",
  template: template//.replace(/\s\s/g,'')//prevent accidentally spacing
}) export class AppComponent{
  version: string = (packageJson as any).version;
  viewcode:boolean
  loaded:boolean
  sending:boolean
  publishableKey = testKey
  lastError:Error
  token:any
  tempPublishableKey = testKey
  stripe:StripeInstance
  stripeBank:StripeInstance
  demoTemplate:string = demoTemplate

  request = {
    owner: {
      "address": {
        "city": 'Coconut Creek',
        "country": null,
        "line1": '1234 sw 1st ct',
        "line2": null,
        "postal_code": "33066",
        "state": 'FL'
      },
      email: 'jenny.rosen@example.com',
      name: 'jenny rosen',
      phone: '561-561-5611',
    },

    metadata: {
      testedUsing: 'stripe-angular',
      author: 'Acker Apple'
    }
  }

  extraData = {
    name: "",
    address_city: "",
    address_country: "",
    address_line1: "",
    address_line1_check: "",
    address_line2: "",
    address_state: "",
    address_zip: "",
    metadata: this.request.metadata
  }

  bankData = {
    country: 'US',
    currency: 'usd',
    routing_number: '110000000',
    account_number: '000123456789',
    account_holder_name: 'Jenny Rosen',
    account_holder_type: 'individual',
  }

  constructor(public StripeScriptTag:StripeScriptTag){}

  ngOnInit(){
    //inject script tag onto document and apply publishableKey
    this.apply(this.publishableKey)
    .then( ()=>this.loaded=true )
    .catch(e=>{
      this.lastError=e
      return Promise.reject(e)
    })
  }

  async apply(key):Promise<StripeInstance>{
    this.publishableKey = key
    return this.StripeScriptTag.setPublishableKey(this.publishableKey)
    .then(StripeInstance=>this.stripe=StripeInstance)
  }

  changeRequest(data:string){
    this.request = JSON.parse(data)

    if (this.request.metadata) {
      this.extraData.metadata = this.request.metadata
    }
  }
  changeExtraData(data:string){
    this.extraData = JSON.parse(data)
  }

  changeBankData(data:string){
    this.bankData = JSON.parse(data)
  }

  log(message) {
    console.log(message);
  }
}
