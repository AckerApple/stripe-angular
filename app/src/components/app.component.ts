import { Component, EventEmitter } from "@angular/core"
import { string as demoTemplate } from "./templates/app.component.template"
import { StripeScriptTag } from "../../../src/index"
//DEMO REFERENCE TO stripe-angular . USE BELOW
import {
  BankAccountTokenOptions,
  StripeInstance, ElementsOptions, Token
} from "../../../src/StripeTypes"
import * as packageJson from "../../../package.json"

//YOUR REFERENCE TO stripe-angular
//import { Stripe, StripeScriptTag } from "stripe-angular"

const testKey = localStorage?.stripeAnguarKey || "pk_test_5JZuHhxsinNGc5JanVWWKSKq"
const stripeServer = 'https://api.stripe.com/v1/';

@Component({
  selector:"app",
  templateUrl: './app.component.html'//.replace(/\s\s/g,'')//prevent accidentally spacing
}) export class AppComponent{
  version: string = (packageJson as any).version;

  loaded: boolean
  sending: boolean
  cardComplete = false
  saveKeyLocally = false
  savePrivateKeyLocally = false
  enableServerMode?: boolean;

  tempPublishableKey = testKey
  publishableKey = testKey
  tempPrivateKey = localStorage?.stripeAngularPrivateKey;
  privateKey?: string = localStorage?.stripeAngularPrivateKey;
  localStorage = localStorage;

  lastError:Error
  card: {
    token?:any
    source?:any
  } = {}
  stripe:StripeInstance
  stripeBank:StripeInstance
  demoTemplate:string = demoTemplate

  // card elements options
  options: ElementsOptions = {
    classes: {
      base: '',
      complete: '',
      empty: '',
      focus: '',
      invalid: '',
      webkitAutofill: '',
    },
    hidePostalCode: false,
    hideIcon: false,
    iconStyle: 'solid',
    style: {},
    value: {postalCode: ''},

    // TODO: Add this back at later date (avoided due to this package doesn't cover transactions yet)
    // paymentRequest?: paymentRequest.StripePaymentRequest;

    disabled: false
  };

  // passed along when token or sources created
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

  // passed along during card token creation
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

  // ach token data
  bank: {
    data: BankAccountTokenOptions,
    verify: {amount1?: number, amount2?: number},
    verifyResponse?: any,
    token?: any
  } = {
    verify: {}, // used during micro deposit verification
    data: {
      country: 'US',
      currency: 'usd',
      routing_number: '110000000',
      account_number: '000123456789',
      account_holder_name: 'Jenny Rosen',
      account_holder_type: 'individual',
      metadata: this.request.metadata
    }
  }

  customer: ISimpleRouteEditor = {
    $create: new EventEmitter(),
    data: {
      description: "some new customer",
      metadata: this.request.metadata
    }
  }

  payintent: ISimpleRouteEditor = {
    $create: new EventEmitter(),
    data: {
      amount: 1099,
      currency: 'usd',
      setup_future_usage: 'off_session',
      metadata: this.request.metadata
    }
  }

  charge: ISimpleRouteEditor = {
    $create: new EventEmitter(),
    data: {
      amount: 1099,
      currency: 'usd',
      source: 'token-here',
      metadata: this.request.metadata
    }
  }

  constructor(public StripeScriptTag: StripeScriptTag){
    this.customer.$create.subscribe(data => this.createCustomer(data))
    this.payintent.$create.subscribe(data => this.createPayIntent(data))
    this.charge.$create.subscribe(data => this.createCharge(data))
  }

  ngOnInit(){
    //inject script tag onto document and apply publishableKey
    this.apply(this.publishableKey)
    .then( ()=>this.loaded=true )
    .catch(e=>{
      this.lastError=e
      return Promise.reject(e)
    })
  }

  deleteLocalStorage() {
    localStorage.stripeAngularPrivateKey = null;
    localStorage.stripeAnguarKey = null;

    delete localStorage.stripeAngularPrivateKey;
    delete localStorage.stripeAnguarKey;
  }

  async apply(key):Promise<StripeInstance>{
    if (this.saveKeyLocally) {
      localStorage.stripeAnguarKey = key;
    }

    this.privateKey = this.tempPrivateKey;
    if (this.savePrivateKeyLocally) {
      localStorage.stripeAngularPrivateKey = this.privateKey;
    }

    this.publishableKey = key;
    return this.StripeScriptTag.setPublishableKey(this.publishableKey)
      .then(StripeInstance=>this.stripe=StripeInstance);
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

  changeOptions(data:string){
    this.options = JSON.parse(data)
  }

  changeKey(key: string, value: string) {
    const keys = key.split('.')
    var current = this;

    while(keys.length > 1) {
      current = current[keys.shift()];
    }

    current[keys[0]] = JSON.parse(value);
  }

  log(message) {
    console.log(message);
  }

  toggleServerMode() {
    this.enableServerMode = !this.enableServerMode;

    if (!this.enableServerMode) {
      localStorage.stripeAngularPrivateKey = null
      delete localStorage.stripeAngularPrivateKey
      delete this.tempPrivateKey
      delete this.privateKey
    }
  }

  createCustomer(data: any) {
    request({
      url: stripeServer + 'customers',
      post: data,
      authorizationBearer: this.privateKey
    }).then(res => this.customer.result = tryParse(res));
  }

  createPayIntent(data: any) {
    request({
      url: stripeServer + 'payment_intents',
      post: data,
      authorizationBearer: this.privateKey
    }).then(res => this.payintent.result = tryParse(res));
  }

  createCharge(data: any) {
    request({
      url: stripeServer + 'charges',
      post: data,
      authorizationBearer: this.privateKey
    }).then(res => this.charge.result = tryParse(res));
  }

  createCustomerByToken(token: Token) {
    const customer = this.customer.data;
    customer.source = token.id;

    this.createCustomer(customer);
  }

  verifyBank() {
    const base = stripeServer + 'customers/'
    const cusId = this.customer.result.id;
    const bankId = this.bank.token.bank_account.id;
    const url = base + `${cusId}/sources/${bankId}/verify`;
    request({
      url,
      authorizationBearer: this.privateKey,
      post: {
        amounts:[
          this.bank.verify.amount1,
          this.bank.verify.amount2
        ]
      }
    }).then(result => this.bank.verifyResponse = tryParse(result))
  }
}


function request(
  {url, post, authorizationBearer}: {
    url: string, post: {[x: string]: any}
    authorizationBearer?: string
  }
) {
  return new Promise((res, rej) => {
    const req = new XMLHttpRequest();
    req.open('POST', url, true);
    req.setRequestHeader('Accept', 'application/json');

    if (authorizationBearer) {
      req.setRequestHeader('Authorization', 'Bearer ' + authorizationBearer);
    }

    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    req.send( objectToUriForm(post) );

    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        res(req.responseText);
        req.responseText;
      }
    }
  });
}

function objectToUriForm(
  ob: {[index: string]: any} | string[],
  parentKey?: string
): string {
  let returnString = '';

  if (!ob) {
    return returnString;
  } else if (Array.isArray(ob)) {
    ob.forEach(value => {
      returnString += `${parentKey}[]=${encodeURIComponent(value)}&`;
    });
  } else {
    Object.keys(ob).forEach(key => {
      const value = ob[key]
      let endKey = key;
      let stringValue = '';

      switch (typeof(value)) {
        case 'string':
        case 'number':
          stringValue = value.toString();
          break;

        case 'object':
          return returnString += objectToUriForm(value, key) + '&';
      }

      if (parentKey) {
        endKey = `${parentKey}[${key}]`
      }

      returnString += `${endKey}=${encodeURIComponent(stringValue)}` + '&'
    });
  }

  if (returnString.length) {
    returnString = returnString.substr(0, returnString.length - 1) // last &
  }

  return returnString;
}

function tryParse(data: string | any) {
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
}

interface ISimpleRouteEditor {
  data: any
  result?: any
  $create: EventEmitter<any>
}