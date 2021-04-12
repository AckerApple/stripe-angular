import { Component, EventEmitter } from "@angular/core"
import { string as demoTemplate, string } from "./templates/app.component.template"
import { StripeScriptTag } from "stripe-angular"
import * as packageJson from "stripe-angular/package.json"
import {
  request, ISimpleRouteEditor, sample, localSchema, getProjectLocalStorage,
  copyText, tryParse, stripeServer,
} from "./app.component.utils"

const storage: localSchema = getProjectLocalStorage()

@Component({
  selector:"app",
  templateUrl: './app.component.html'//.replace(/\s\s/g,'')//prevent accidentally spacing
}) export class AppComponent{
  version: string = (packageJson as any).version;

  loaded: boolean
  sending: boolean
  cardComplete = false
  enableServerMode?: boolean;

  tempPublishableKey = storage.key
  // publishableKey = storage.key
  tempPrivateKey = storage.privateKey// localStorage?.stripeAngularPrivateKey;
  // privateKey?: string = localStorage?.stripeAngularPrivateKey;

  storage: localSchema = storage
  localStorage = localStorage

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

  // passed along during card token creation
  extraData = storage.extraData || {
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

  // create
  customer: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    load: 0,
    request: {
      method: 'POST',
      path: 'customers/'
    },
    data: {
      description: "some new customer",
      ...sample.owner,
      metadata: sample.metadata
    }
  }

  customer_update: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    request: {
      method: 'POST',
      path: 'customers/${id}'
    },
    load: 0,
    data: {
      id: "",
      metadata: sample.metadata
    }
  }

  customer_get: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    request: {
      method: 'GET',
      path: 'customers/${id}'
    },
    load: 0,
    data: {
      id: ""
    }
  }

  get_paymethods: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    request: {
      method: 'GET',
      path: 'payment_methods/'
    },
    load: 0,
    data: {
      customer: "", type: "card"
    }
  }

  customer_attach_method: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    request: {
      method: 'POST',
      path: 'payment_methods/${paymentMethod.id}/attach'
    },
    load: 0,
    data: {} // not used currently
  }

  customer_detach_method: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    request: {
      method: 'POST',
      path: 'payment_methods/${paymentMethod.id}/detach'
    },
    load: 0,
    data: {} // not used currently
  }

  customer_get_sources: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    request: {
      method: 'GET',
      path: 'customers/${id}/sources'
    },
    load: 0,
    data: {
      id: ""
    }
  }

  source_get: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    request: {
      method: 'GET',
      path: 'sources/${id}'
    },
    load: 0,
    data: {
      id: ""
    }
  }

  source_update: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    request: {
      method: 'POST',
      path: 'sources/${id}'
    },
    load: 0,
    data: {
      id: ""
    }
  }

  payment_method_get: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    request: {
      method: 'GET',
      path: 'payment_methods/${id}'
    },
    load: 0,
    data: {
      id: ""
    }
  }

  payment_method_update: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    request: {
      method: 'POST',
      path: 'payment_methods/${id}'
    },
    load: 0,
    data: {
      id: ""
    }
  }

  payintent: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    request: {
      method: 'POST',
      path: 'payment_intents/'
    },
    load: 0,
    data: {
      amount: 1099,
      confirm: 'true',
      currency: 'usd',
      setup_future_usage: 'off_session',
      metadata: sample.metadata
    }
  }

  payintent_retrieve: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    request: {
      method: 'GET',
      path: 'payment_intents/${id}'
    },
    load: 0,
    data: {
      id: '',
    }
  }

  payintent_cancel: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    request: {
      method: 'POST',
      path: 'payment_intents/${id}/cancel'
    },
    load: 0,
    data: {
      id: '',
      cancellation_reason: 'requested_by_customer', // duplicate, fraudulent, requested_by_customer, or abandoned
    }
  }

  charge: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    request: {
      method: 'POST',
      path: 'charges/'
    },
    load: 0,
    data: {
      amount: 1099,
      currency: 'usd',
      metadata: sample.metadata
    }
  }

  constructor(public StripeScriptTag: StripeScriptTag){
    this.source_update.$send.subscribe(data => this.sendSourceUpdate(data, data.id))
    this.payment_method_update.$send.subscribe(data => this.sendPaymentMethodUpdate(data, data.id))
    this.payment_method_get.$send.subscribe(data => this.getPaymentMethod(data.id))
    this.source_get.$send.subscribe(data => this.getSource(data.id))
    this.customer_get.$send.subscribe(data => this.getCustomer(data.id))
    this.customer_get_sources.$send.subscribe(data => this.getCustomerSources(data.id))
    this.get_paymethods.$send.subscribe(data => this.getPaymentMethods(data as any))
    this.customer_update.$send.subscribe(data => this.updateCustomer(data, data.id))
    this.customer.$send.subscribe(data => this.createCustomer(data))
    this.payintent.$send.subscribe(data => this.createPayIntent(data))
    this.payintent_retrieve.$send.subscribe(data => this.retrievePayIntent(data.id))
    this.payintent_cancel.$send.subscribe(data => this.cancelPayIntent(data.id))
    this.charge.$send.subscribe(data => this.createCharge(data))

    if (Object.keys(storage.metadata).length) {
      this.defaultMetadata(storage.metadata)
    }
  }

  defaultMetadata(meta: Record<string, any>) {
    storage.requests.source.metadata = meta
    storage.requests.paymentMethod.metadata = meta

    this.customer_update.data.metadata = meta
    this.customer.data.metadata = meta
    this.payintent.data.metadata = meta
    this.charge.data.metadata = meta

    this.extraData.metadata = meta;
    (this.bank.data as any).metadata = meta
  }

  ngOnInit(){
    //inject script tag onto document and save
    this.save()
    .then( ()=>this.loaded=true )
    .catch(e=>{
      this.lastError=e
      return Promise.reject(e)
    })
  }

  deleteLocalStorage() {
    localStorage.stripeAngular = null
    delete localStorage.stripeAngular

    // support old delete
    localStorage.stripeAngularPrivateKey = null;
    localStorage.stripeAngularKey = null;
    delete localStorage.stripeAngularPrivateKey;
    delete localStorage.stripeAngularKey;
  }

  copyShareUrl() {
    const storage = this.getSaveableStorage()

    // do let next client auto assume saving these
    delete storage.saveRequestsLocal
    delete storage.savePrivateKeyLocally
    delete storage.saveKeyLocally

    if (storage.privateKey && !confirm('include private server key?')) {
      delete storage.privateKey
    }

    const storageString = encodeURI(JSON.stringify(storage))
    const url = window.location.href.split('?').shift() + '?storage=' + storageString
    copyText(url)
    alert('copied')
  }

  async save(): Promise<stripe.Stripe>{
    const saveKeyLocally = this.storage.saveKeyLocally
    const savePrivateKeyLocally = this.storage.savePrivateKeyLocally
    this.tempPublishableKey
    this.storage.key = this.tempPublishableKey || this.storage.key

    if (savePrivateKeyLocally) {
      // localStorage.stripeAngularPrivateKey = this.privateKey;
      this.storage.privateKey = this.tempPrivateKey || this.storage.privateKey
    }

    const storeLocally = saveKeyLocally || savePrivateKeyLocally || this.storage.saveRequestsLocal
    if (storeLocally) {
      const cloneStorage = this.getSaveableStorage()
      const storageString = JSON.stringify(cloneStorage)
      localStorage.stripeAngular = storageString

      cloneStorage.privateKey = this.storage.privateKey?.length // never show

      this.log('saved to localStorage', cloneStorage)
    }

    return this.StripeScriptTag.setPublishableKey(this.storage.key)
      .then(stripe =>this.stripe=stripe);
  }

  getSaveableStorage() {
    const cloneStorage = JSON.parse(JSON.stringify(this.storage))
    delete cloneStorage.temp

    if (!cloneStorage.saveKeyLocally) {
      delete cloneStorage.key
    }


    if (!cloneStorage.savePrivateKeyLocally) {
      delete cloneStorage.privateKey
    }

    if (!cloneStorage.saveRequestsLocal) {
      delete cloneStorage.requests
    }

    return cloneStorage
  }

  changeSourceRequest(data:string){
    let source;

    try {
      source = this.storage.requests.source = JSON.parse(data)
    } catch (err) {
      this.storage.temp.invalidSourceData = true
      this.log(err);
      return
    }

    delete this.storage.temp.invalidSourceData

    if (source.metadata) {
      this.extraData.metadata = source.metadata
    }

    if (this.storage.saveRequestsLocal) {
      this.storage.requests.source = source
      this.save()
    }
  }

  changePaymentMethodRequest(data:string){
    const pmr = this.storage.requests.paymentMethod = JSON.parse(data)

    if (pmr.metadata) {
      this.extraData.metadata = pmr.metadata
    }

    if (this.storage.saveRequestsLocal) {
      this.storage.requests.paymentMethod = pmr
      this.save()
    }
  }

  changeExtraData(data:string){
    this.extraData = JSON.parse(data)

    if (this.storage.saveRequestsLocal) {
      this.storage.extraData = this.extraData
      this.save()
    }
  }

  changeOptions(data:string){
    this.options = JSON.parse(data)
  }

  changeKey(
    scope: ISimpleRouteEditor,
    value: string
  ) {
    delete scope.error
    const keys = ['data']
    var current = scope;

    while(keys.length > 1) {
      current = current[keys.shift()];
    }

    try {
      // current[keys[0]] = JSON.parse(value);
      eval('current[keys[0]] = ' + value); // allow loose js to be cast to json
    } catch (err) {
      scope.error = Object.getOwnPropertyNames(err).reverse().reduce((a, key) => (a[key] = err[key]) && a || a, {} as any)
      console.error(`failed to parse object key ${keys[0]}`);
      throw err
    }
  }

  log(...args) {
    console.log(...args);
  }

  toggleServerMode() {
    this.enableServerMode = !this.enableServerMode;

    if (!this.enableServerMode) {
      localStorage.stripeAngularPrivateKey = null
      delete localStorage.stripeAngularPrivateKey
      delete this.tempPrivateKey
      delete this.tempPublishableKey
    }
  }

  getSource(sourceId: string) {
    ++this.source_get.load
    request({
      url: stripeServer + 'sources/' + sourceId,
      authorizationBearer: this.storage.privateKey
    })
      .then(res => this.setSource(res))
      .finally(() => --this.source_get.load)
  }

  getPaymentMethod(id: string) {
    ++this.payment_method_get.load
    request({
      url: stripeServer + 'payment_methods/' + id,
      authorizationBearer: this.storage.privateKey
    })
      .then(res => this.setPaymentMethod(res))
      .finally(() => --this.payment_method_get.load)
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
    ++this.customer_get.load
    request({
      url: stripeServer + 'customers/' + id,
      authorizationBearer: this.storage.privateKey
    })
      .then(res => {
        this.customer_get.result = tryParse(res)
        this.customer_get.resultAt = Date.now()
      })
      .finally(() => --this.customer_get.load)
  }

  getPaymentMethods(query: stripe.PaymentMethodData) {
    const queryString = Object.keys(query).reduce((all, key) => all + (all.length && '&' || '') + `${key}=${query[key]}`,'')
    const url = stripeServer + 'payment_methods?' + queryString
    ++this.payment_method_get.load

    request({
      url, method: 'GET',
      post: query,
      authorizationBearer: this.storage.privateKey
    }).then(res => {
      this.get_paymethods.result = tryParse(res)
      this.get_paymethods.resultAt = Date.now()

      if (!this.payment_method_get.result && this.get_paymethods.result?.data?.length) {
        this.payment_method_get.result = this.get_paymethods.result.data[0]
      }
    })
      .finally(() => --this.payment_method_get.load)
  }

  getCustomerSources(id: string) {
    ++this.customer_get_sources.load
    request({
      url: stripeServer + 'customers/' + id + '/sources',
      authorizationBearer: this.storage.privateKey
    }).then(res => {
      this.customer_get_sources.result = tryParse(res)
      this.customer_get_sources.resultAt = Date.now()
    })
      .finally(() => --this.customer_get_sources.load)
  }

  createCustomer(data: any) {
    ++this.customer.load

    request({
      url: stripeServer + 'customers',
      post: data,
      authorizationBearer: this.storage.privateKey
    }).then(res => {
      this.customer.result = tryParse(res)
      this.customer.resultAt = Date.now()
    })
    .finally(() => --this.customer.load)
  }

  createPayIntent(data: any) {
    ++this.payintent.load

    request({
      url: stripeServer + 'payment_intents',
      post: data,
      authorizationBearer: this.storage.privateKey
    })
      .then(res => {
        this.payintent.result = tryParse(res)
        this.payintent.resultAt = Date.now()

        this.payintent_retrieve.result = this.payintent.result
        this.payintent_retrieve.resultAt = this.payintent.resultAt
      })
      .finally(() => --this.payintent.load)
  }

  retrievePayIntent(id: string) {
    ++this.payintent_retrieve.load
    const url = stripeServer + 'payment_intents/' + id

    console.log('url', url)

    request({url, authorizationBearer: this.storage.privateKey})
      .then((res: string) => {
        this.payintent_retrieve.result = tryParse(res)
        this.payintent_retrieve.resultAt = Date.now()
      })
      .finally(() => --this.payintent_retrieve.load)
  }

  cancelPayIntent(id: string) {
    ++this.payintent_cancel.load
    const url = `${stripeServer}payment_intents/${id}/cancel`

    request({url, post: {
      cancellation_reason: this.payintent_cancel.data.cancellation_reason
    }, authorizationBearer: this.storage.privateKey})
      .then((res: string) => {
        this.payintent_cancel.result = tryParse(res)
        this.payintent_cancel.resultAt = Date.now()
      })
      .finally(() => --this.payintent_cancel.load)
  }

  createCharge(data: any) {
    ++this.charge.load

    request({
      url: stripeServer + 'charges',
      post: data,
      authorizationBearer: this.storage.privateKey
    })
      .then(res => {
        this.charge.result = tryParse(res)
        this.charge.resultAt = Date.now()
      })
      .finally(() => --this.charge.load)
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
      authorizationBearer: this.storage.privateKey,
      post: {
        amounts:[
          this.bank.verify.amount1,
          this.bank.verify.amount2
        ]
      }
    })
      .then(result => this.bank.verifyResponse = tryParse(result))
  }

  /*fetchPayIntentUpdate(config: ISimpleRouteEditor) {
    const base = stripeServer + 'payment_intents/'
    const intentId = config.result.id;
    const url = base + intentId;
    ++config.load

    request({
      url,
      authorizationBearer: this.storage.privateKey
    })
      // .then(result => config.retrieve = tryParse(result))
      .finally(() => --config.load)
  }*/

  sendSourceUpdate(data: any, id: string) {
    const shallowClone = {...data}
    delete shallowClone.id; // just incase left over from text area

    const base = stripeServer + 'sources/'
    const url = base + id;
    ++this.source_update.load

    request({
      url,
      post: shallowClone,
      authorizationBearer: this.storage.privateKey
    }).then(result => {
      this.source_update.result = tryParse(result)
      this.source_update.resultAt = Date.now()
    }).finally(() => --this.source_update.load)
  }

  sendPaymentMethodUpdate(data: any, id: string) {
    const shallowClone = {...data}
    delete shallowClone.id; // just incase left over from text area

    const base = stripeServer + 'payment_methods/'
    const url = base + id;
    ++this.payment_method_update.load

    request({
      url,
      post: shallowClone,
      authorizationBearer: this.storage.privateKey
    }).then(result => {
      this.payment_method_update.result = tryParse(result)
      this.payment_method_update.resultAt = Date.now()
    }).finally(() => --this.payment_method_update.load)
  }

  updateCustomer(data: any, id: string) {
    const shallowClone = {...data}
    delete shallowClone.id; // just incase left over from text area

    const base = stripeServer + 'customers/'
    const url = base + id
    ++this.customer_update.load

    request({
      url,
      post: shallowClone,
      authorizationBearer: this.storage.privateKey
    }).then(result => {
      this.customer_update.result = tryParse(result)
      this.customer_update.resultAt = Date.now()
    }).finally(() => --this.customer_update.load)
  }

  cleanSourceUpdateData(data: any) {
    const deepClone = JSON.parse(JSON.stringify(data))

    this.cleanCardData(deepClone.card)
    this.cleanOwnerData(deepClone.owner)
    const removeKeys = [
      'amount',
      'object', 'client_secret', 'created', 'flow', 'livemode', 'address', 'status',
      'type', 'usage', 'currency', 'statement_descriptor',
      'customer' // you cannot associate customer during source update
    ]

    removeKeys.forEach(key => delete deepClone[key])

    return deepClone
  }

  cleanOwnerData(data: Record<string, string>) {
    const removeKeys = [
      'verified_address', 'verified_email', 'verified_name', 'verified_phone',
    ]

    removeKeys.forEach(key => delete data[key])

    return data
  }

  cleanCardData(data: Record<string, any>) {
    const cardRemoveKeys = [
      'wallet', 'checks', 'three_d_secure_usage', 'fingerprint', 'last4', 'generated_from',
      'country', 'brand', 'address_line1_check', 'address_zip_check', 'cvc_check',
      'funding', 'three_d_secure', 'name', 'tokenization_method', 'dynamic_last4'
    ]
    cardRemoveKeys.forEach(key => delete data[key])
    if (data.networks) {
      delete data.networks.available
      delete data.networks.preferred
    }
    return data
  }

  cleanPaymentMethodUpdateData(data: any) {
    const deepClone = JSON.parse(JSON.stringify(data))

    const removeKeys = [
      'object', 'checks', 'available', 'created', 'livemode', 'type',
      'customer', // you cannot associate customer during pay method update
    ]

    removeKeys.forEach(key => delete deepClone[key])
    this.cleanCardData(deepClone.card)

    if (data.billing_details) {
      this.cleanBillingDetails(data.billing_details)
    }

    return deepClone
  }

  cleanBillingDetails(data: Record<string, any>) {
    if (data.address?.country === null || data.address?.country === 'null') {
      delete data.address.country
    }
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

  setCustomerDefaultPayMethod(
    customer: any,
    payment_method: stripe.paymentMethod.PaymentMethod
  ) {
    customer.invoice_settings = customer.invoice_settings || {}
    customer.invoice_settings.default_payment_method = payment_method.id
  }

  attachCustomerPayMethod(
    customerId: string,
    paymentMethod: stripe.paymentMethod.PaymentMethod
  ) {
    ++this.customer_attach_method.load

    request({
      url: `${stripeServer}payment_methods/${paymentMethod.id}/attach`,
      post: {
        customer: customerId
      },
      authorizationBearer: this.storage.privateKey
    }).then(result => {
      this.customer_attach_method.result = tryParse(result)
      this.customer_attach_method.resultAt = Date.now()
    }).finally(() => --this.customer_attach_method.load)
  }

  detachCustomerPayMethod(
    paymentMethod: stripe.paymentMethod.PaymentMethod
  ) {
    ++this.customer_detach_method.load
    request({
      url: `${stripeServer}payment_methods/${paymentMethod.id}/detach`,
      method: 'POST',
      authorizationBearer: this.storage.privateKey
    }).then(result => {
      this.customer_detach_method.result = tryParse(result)
      this.customer_detach_method.resultAt = Date.now()
    }).finally(() => --this.customer_detach_method.load)
  }

  copyText(text: string) {
    copyText(text)
  }

  updateStorageMeta(stringData: string) {
    this.storage.metadata = JSON.parse(stringData)
  }
}
