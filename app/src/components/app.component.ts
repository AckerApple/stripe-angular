import { Component, EventEmitter } from "@angular/core"
import { string as demoTemplate, string } from "./templates/app.component.template"
import { StripeScriptTag } from "../../../src/index"
import { BankAccountTokenOptions } from "../../../src/StripeTypes";
//DEMO REFERENCE TO stripe-angular . USE BELOW
import * as packageJson from "../../../package.json"

//YOUR REFERENCE TO stripe-angular
//import { Stripe, StripeScriptTag } from "stripe-angular"

const testKey = localStorage?.stripeAnguarKey || "pk_test_5JZuHhxsinNGc5JanVWWKSKq"
const stripeServer = 'https://api.stripe.com/v1/';
const sampleAddress = {
  city: 'Coconut Creek',
  country: null,
  line1: '1234 sw 1st ct',
  line2: null,
  postal_code: '33066',
  state: 'FL'
}
const sample = {
  metadata: {
    testedUsing: 'stripe-angular',
    author: 'Acker Apple'
  },
  owner: {
    email: 'jenny.rosen@example.com',
    name: 'jenny rosen',
    phone: '561-561-5611',
    address: sampleAddress
  }
}

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
    payment_method?: stripe.paymentMethod.PaymentMethod
  } = {}
  stripe:stripe.Stripe
  stripeBank:stripe.Stripe
  demoTemplate:string = demoTemplate

  // card elements options
  options: stripe.elements.ElementsOptions = {
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
  sourceRequest = {
    owner: sample.owner,
    metadata: sample.metadata
  }

  paymentMethodRequest = {
    metadata: sample.metadata
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
    metadata: sample.metadata
  }

  // ach token data
  bank: {
    data: stripe.BankAccountTokenOptions,
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
      metadata: sample.metadata
    } as (stripe.BankAccountTokenOptions) // The stripe-v3 types are missing the metadata property.
  }

  customer: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    data: {
      description: "some new customer",
      ...sample.owner,
      metadata: sample.metadata
    }
  }

  customer_update: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    data: {
      id: "",
      metadata: sample.metadata
    }
  }

  customer_get: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    data: {
      id: ""
    }
  }

  source_get: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    data: {
      id: ""
    }
  }

  source_update: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    data: {
      id: ""
    }
  }

  payment_method_get: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    data: {
      id: ""
    }
  }

  payment_method_update: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    data: {
      id: ""
    }
  }

  payintent: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    data: {
      amount: 1099,
      confirm: 'true',
      currency: 'usd',
      setup_future_usage: 'off_session',
      metadata: sample.metadata
    }
  }

  charge: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    data: {
      amount: 1099,
      currency: 'usd',
      source: 'token-here',
      metadata: sample.metadata
    }
  }

  constructor(public StripeScriptTag: StripeScriptTag){
    this.source_update.$send.subscribe(data => this.sendSourceUpdate(data, data.id))
    this.payment_method_update.$send.subscribe(data => this.sendPaymentMethodUpdate(data, data.id))
    this.payment_method_get.$send.subscribe(data => this.getPaymentMethod(data.id))
    this.source_get.$send.subscribe(data => this.getSource(data.id))
    this.customer_get.$send.subscribe(data => this.getCustomer(data.id))
    this.customer_update.$send.subscribe(data => this.updateCustomer(data, data.id))
    this.customer.$send.subscribe(data => this.createCustomer(data))
    this.payintent.$send.subscribe(data => this.createPayIntent(data))
    this.charge.$send.subscribe(data => this.createCharge(data))
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

  async apply(key):Promise<stripe.Stripe>{
    if (this.saveKeyLocally) {
      localStorage.stripeAnguarKey = key;
    }

    this.privateKey = this.tempPrivateKey;
    if (this.savePrivateKeyLocally) {
      localStorage.stripeAngularPrivateKey = this.privateKey;
    }

    this.publishableKey = key;
    return this.StripeScriptTag.setPublishableKey(this.publishableKey)
      .then(stripe =>this.stripe=stripe);
  }

  changeSourceRequest(data:string){
    this.sourceRequest = JSON.parse(data)

    if (this.sourceRequest.metadata) {
      this.extraData.metadata = this.sourceRequest.metadata
    }
  }

  changePaymentMethodRequest(data:string){
    this.paymentMethodRequest = JSON.parse(data)

    if (this.paymentMethodRequest.metadata) {
      this.extraData.metadata = this.paymentMethodRequest.metadata
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

    try {
      // current[keys[0]] = JSON.parse(value);
      eval('current[keys[0]] = ' + value); // allow loose js to be cast to json
    } catch (err) {
      console.error(`failed to parse object key ${keys[0]}`);
      throw err
    }
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

  getSource(sourceId: string) {
    request({
      url: stripeServer + 'sources/' + sourceId,
      authorizationBearer: this.privateKey
    }).then(res => this.setSource(res));
  }

  getPaymentMethod(id: string) {
    request({
      url: stripeServer + 'payment_methods/' + id,
      authorizationBearer: this.privateKey
    }).then(res => this.setPaymentMethod(res));
  }

  setPaymentMethod(res: any) {
    this.payment_method_get.result = tryParse(res)
    this.payment_method_get.resultAt = Date.now()
  }

  setSource(res: any) {
    this.source_get.result = tryParse(res)
    this.source_get.resultAt = Date.now()
  }

  getCustomer(id: string) {
    request({
      url: stripeServer + 'customers/' + id,
      authorizationBearer: this.privateKey
    }).then(res => {
      this.customer_get.result = tryParse(res)
      this.customer_get.resultAt = Date.now()
    });
  }

  createCustomer(data: any) {
    request({
      url: stripeServer + 'customers',
      post: data,
      authorizationBearer: this.privateKey
    }).then(res => {
      this.customer.result = tryParse(res)
      this.customer.resultAt = Date.now()
    });
  }

  createPayIntent(data: any) {
    request({
      url: stripeServer + 'payment_intents',
      post: data,
      authorizationBearer: this.privateKey
    }).then(res => {
      this.payintent.result = tryParse(res)
      this.payintent.resultAt = Date.now()
    });
  }

  createCharge(data: any) {
    request({
      url: stripeServer + 'charges',
      post: data,
      authorizationBearer: this.privateKey
    }).then(res => {
      this.charge.result = tryParse(res)
      this.charge.resultAt = Date.now()
    });
  }

  // a source or token converted into a customer
  createCustomerByToken(token: stripe.Token) {
    const customer = this.customer.data;
    customer.source = token.id;

    this.createCustomer(customer);
  }

  // a source or token converted into a customer
  createCustomerByPaymentMethod(data: stripe.paymentMethod.PaymentMethod) {
    const customer = this.customer.data;
    customer.payment_method = data.id;

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

  fetchPayIntentUpdate(config: ISimpleRouteEditor) {
    const base = stripeServer + 'payment_intents/'
    const intentId = config.result.id;
    const url = base + intentId;
    request({
      url,
      authorizationBearer: this.privateKey
    }).then(result => config.retrieve = tryParse(result))
  }

  sendSourceUpdate(data: any, id: string) {
    const shallowClone = {...data}
    delete shallowClone.id; // just incase left over from text area

    const base = stripeServer + 'sources/'
    const url = base + id;

    request({
      url,
      post: shallowClone,
      authorizationBearer: this.privateKey
    }).then(result => {
      this.source_update.result = tryParse(result)
      this.source_update.resultAt = Date.now()
    })
  }

  sendPaymentMethodUpdate(data: any, id: string) {
    const shallowClone = {...data}
    delete shallowClone.id; // just incase left over from text area

    const base = stripeServer + 'payment_methods/'
    const url = base + id;

    request({
      url,
      post: shallowClone,
      authorizationBearer: this.privateKey
    }).then(result => {
      this.payment_method_update.result = tryParse(result)
      this.payment_method_update.resultAt = Date.now()
    })
  }

  updateCustomer(data: any, id: string) {
    const shallowClone = {...data}
    delete shallowClone.id; // just incase left over from text area

    const base = stripeServer + 'customers/'
    const url = base + id;

    request({
      url,
      post: shallowClone,
      authorizationBearer: this.privateKey
    }).then(result => {
      this.customer_update.result = tryParse(result)
      this.customer_update.resultAt = Date.now()
    })
  }

  cleanSourceUpdateData(data: any) {
    const deepClone = JSON.parse(JSON.stringify(data))

    const removeKeys = [
      'object', 'client_secret', 'created', 'flow', 'livemode', 'address', 'status', 'type', 'usage',
    ]

    this.cleanCardData(deepClone)
    removeKeys.forEach(key => delete deepClone[key])
    delete deepClone.owner.address

    return deepClone
  }

  cleanCardData(data: any) {
    const cardRemoveKeys = [
      'three_d_secure_usage', 'fingerprint', 'last4', 'country', 'brand', 'address_line1_check', 'address_zip_check', 'cvc_check', 'funding', 'three_d_secure'
    ]
    cardRemoveKeys.forEach(key => delete data.card[key])
    if (data.card.networks) {
      delete data.card.networks.available
    }
  }

  cleanPaymentMethodUpdateData(data: any) {
    const deepClone = JSON.parse(JSON.stringify(data))

    const removeKeys = [
      'object', 'address', 'checks', 'available', 'created', 'livemode', 'type',
    ]

    removeKeys.forEach(key => delete deepClone[key])
    this.cleanCardData(deepClone)
    delete deepClone.billing_details.address

    return deepClone
  }

  cleanCustomerUpdateData(data: any) {
    const deepClone = JSON.parse(JSON.stringify(data))

    const removeKeys = [
      'account_balance', 'balance',
      'object', 'cards', 'created', 'delinquent', 'livemode', 'sources', 'data', 'subscriptions', 'tax_ids'
    ]
    removeKeys.forEach(key => delete deepClone[key])

    return deepClone
  }
}

function request(
  {url, post, authorizationBearer}: {
    url: string, post?: {[x: string]: any}
    authorizationBearer?: string
  }
) {
  return new Promise((res, rej) => {
    const req = new XMLHttpRequest();
    const method = post ? 'POST' : 'GET'
    req.open(method, url, true);
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
  resultAt?: number
  retrieve?: any // any update checks that might occur
  $send: EventEmitter<any>
}