import { Component, EventEmitter } from "@angular/core"
import { string as demoTemplate, string } from "./templates/app.component.template"
import { StripeScriptTag } from "stripe-angular"
import * as packageJson from "stripe-angular/package.json"
import {
  request, ISimpleRouteEditor, sample, localSchema, getProjectLocalStorage,
  copyText, tryParse, stripeServer, generateTestHeaderString,
} from "./app.component.utils"

const storage: localSchema = getProjectLocalStorage()

@Component({
  selector:"app",
  templateUrl: './app.component.html'
}) export class AppComponent {
  stripe:stripe.Stripe
  cardElement: any // StripeJs Element (TODO: DataType this)

  version: string = (packageJson as any).version;

  loaded: boolean
  sending: boolean
  cardComplete = false
  enableServerMode?: boolean = storage.privateKey ? true : false;

  tempPublishableKey = storage.key
  tempWebhookSigningSecret = storage.webhookSigningSecret
  tempPrivateKey = storage.privateKey// localStorage?.stripeAngularPrivateKey;

  storage: localSchema = storage
  localStorage = localStorage

  lastError:Error
  card: {
    token?:any
    source?:any
    payment_method?: stripe.paymentMethod.PaymentMethod
  } = {}
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

  api = getApis()

  constructor(public StripeScriptTag: StripeScriptTag){
    this.api.confirm_pay_intent.$send.subscribe(data => this.confirmPayIntent())

    // server sides?
    this.api.source_update.$send.subscribe(data => this.sendSourceUpdate(data, data.id))
    this.api.payment_method_update.$send.subscribe(data => this.sendPaymentMethodUpdate(data, data.id))
    this.api.payment_method_get.$send.subscribe(data => this.getPaymentMethod(data.id))
    this.api.source_get.$send.subscribe(data => this.getSource(data.id))
    this.api.customer_get.$send.subscribe(data => this.getCustomer(data.id))
    this.api.customer_get_sources.$send.subscribe(data => this.getCustomerSources(data.id))
    this.api.get_paymethods.$send.subscribe(data => this.getPaymentMethods(data as any))
    this.api.customer_update.$send.subscribe(data => this.updateCustomer(data, data.id))
    this.api.customer.$send.subscribe(data => this.createCustomer(data))
    this.api.payintent.$send.subscribe(data => this.createPayIntent(data))
    this.api.payintent_retrieve.$send.subscribe(data => this.retrievePayIntent(data.id))
    this.api.payintent_cancel.$send.subscribe(data => this.cancelPayIntent(data.id))
    this.api.charge.$send.subscribe(data => this.createCharge(data))
    this.api.testHeader.$send.subscribe(data => this.createTestHeader(data))

    if (Object.keys(storage.metadata).length) {
      this.defaultMetadata(storage.metadata)
    }
  }

  createTestHeader(data: any) {
    const payload = JSON.stringify(data)
    const result = generateTestHeaderString({
      payload, secret: this.storage.webhookSigningSecret
    })
    // const result = stripe.webhooks.generateTestHeaderString(data)
    this.api.testHeader.result = {result}
  }

  defaultMetadata(meta: Record<string, any>) {
    storage.requests.source.metadata = meta
    storage.requests.paymentMethod.metadata = meta

    this.api.customer_update.data.metadata = meta
    this.api.customer.data.metadata = meta
    this.api.payintent.data.metadata = meta
    this.api.charge.data.metadata = meta

    this.extraData.metadata = meta;
    (this.api.bank.data as any).metadata = meta
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
      this.storage.webhookSigningSecret = this.tempWebhookSigningSecret || this.storage.webhookSigningSecret
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
    ++this.api.source_get.load
    request({
      url: stripeServer + 'sources/' + sourceId,
      authorizationBearer: this.storage.privateKey
    })
      .then(res => this.setSource(res))
      .finally(() => --this.api.source_get.load)
  }

  getPaymentMethod(id: string) {
    ++this.api.payment_method_get.load
    request({
      url: stripeServer + 'payment_methods/' + id,
      authorizationBearer: this.storage.privateKey
    })
      .then(res => this.setPaymentMethod(res))
      .finally(() => --this.api.payment_method_get.load)
  }

  setPaymentMethod(res: any) {
    this.api.payment_method_get.result = tryParse(res)
    this.api.payment_method_get.resultAt = Date.now()
  }

  setSource(res: any) {
    this.api.source_get.result = tryParse(res)
    this.api.source_get.resultAt = Date.now()
  }

  getCustomer(id: string) {
    ++this.api.customer_get.load
    request({
      url: stripeServer + 'customers/' + id,
      authorizationBearer: this.storage.privateKey
    })
      .then(res => {
        this.api.customer_get.result = tryParse(res)
        this.api.customer_get.resultAt = Date.now()
      })
      .catch(err => this.api.customer_get.error = err)
      .finally(() => --this.api.customer_get.load)
  }

  getPaymentMethods(query: stripe.PaymentMethodData) {
    const queryString = Object.keys(query).reduce((all, key) => all + (all.length && '&' || '') + `${key}=${query[key]}`,'')
    const url = stripeServer + 'payment_methods?' + queryString
    ++this.api.payment_method_get.load

    request({
      url, method: 'GET',
      post: query,
      authorizationBearer: this.storage.privateKey
    })
      .then(res => {
        this.api.get_paymethods.result = tryParse(res)
        this.api.get_paymethods.resultAt = Date.now()

        if (!this.api.payment_method_get.result && this.api.get_paymethods.result?.data?.length) {
          this.api.payment_method_get.result = this.api.get_paymethods.result.data[0]
        }
      })
      .catch(err => this.api.payment_method_get.error = err)
      .finally(() => --this.api.payment_method_get.load)
  }

  getCustomerSources(id: string) {
    ++this.api.customer_get_sources.load
    request({
      url: stripeServer + 'customers/' + id + '/sources',
      authorizationBearer: this.storage.privateKey
    }).then(res => {
      this.api.customer_get_sources.result = tryParse(res)
      this.api.customer_get_sources.resultAt = Date.now()
    })
      .catch(err => this.api.customer_get_sources.error = err)
      .finally(() => --this.api.customer_get_sources.load)
  }

  createCustomer(data: any) {
    ++this.api.customer.load

    request({
      url: stripeServer + 'customers',
      post: data,
      authorizationBearer: this.storage.privateKey
    }).then(res => {
      this.api.customer.result = tryParse(res)
      this.api.customer.resultAt = Date.now()
    })
    .catch(err => this.api.customer.error = err)
    .finally(() => --this.api.customer.load)
  }

  createPayIntent(data: any) {
    ++this.api.payintent.load

    request({
      url: stripeServer + 'payment_intents',
      post: data,
      authorizationBearer: this.storage.privateKey
    })
      .then(res => {
        this.api.payintent.result = tryParse(res)
        this.api.payintent.resultAt = Date.now()

        this.api.payintent_retrieve.result = this.api.payintent.result
        this.api.payintent_retrieve.resultAt = this.api.payintent.resultAt
      })
      .catch(err => this.api.payintent.error = err)
      .finally(() => --this.api.payintent.load)
  }

  retrievePayIntent(id: string) {
    ++this.api.payintent_retrieve.load
    const url = stripeServer + 'payment_intents/' + id

    request({url, authorizationBearer: this.storage.privateKey})
      .then((res: string) => {
        this.api.payintent_retrieve.result = tryParse(res)
        this.api.payintent_retrieve.resultAt = Date.now()
      })
      .catch(err => this.api.payintent_retrieve.error = err)
      .finally(() => --this.api.payintent_retrieve.load)
  }

  cancelPayIntent(id: string) {
    ++this.api.payintent_cancel.load
    const url = `${stripeServer}payment_intents/${id}/cancel`

    request({url, post: {
      cancellation_reason: this.api.payintent_cancel.data.cancellation_reason
    }, authorizationBearer: this.storage.privateKey})
      .then((res: string) => {
        this.api.payintent_cancel.result = tryParse(res)
        this.api.payintent_cancel.resultAt = Date.now()
      })
      .catch(err => this.api.payintent_cancel.error = err)
      .finally(() => --this.api.payintent_cancel.load)
  }

  createCharge(data: any) {
    ++this.api.charge.load

    request({
      url: stripeServer + 'charges',
      post: data,
      authorizationBearer: this.storage.privateKey
    })
      .then(res => {
        this.api.charge.result = tryParse(res)
        this.api.charge.resultAt = Date.now()
      })
      .catch(err => this.api.charge.error = err)
      .finally(() => --this.api.charge.load)
  }

  // a source or token converted into a customer
  createCustomerByToken(token: stripe.Token) {
    const customer = this.api.customer.data;
    customer.source = token.id;

    this.createCustomer(customer);
  }

  // a source or token converted into a customer
  createCustomerByPaymentMethod(data: stripe.paymentMethod.PaymentMethod) {
    const customer = this.api.customer.data;
    customer.payment_method = data.id;

    this.createCustomer(customer);
  }

  verifyBank() {
    const base = stripeServer + 'customers/'
    const cusId = this.api.customer.result.id;
    const bankId = this.api.bank.token.bank_account.id;
    const url = base + `${cusId}/sources/${bankId}/verify`;

    request({
        url, authorizationBearer: this.storage.privateKey,
        post: {
          amounts:[
            this.api.bank.verify.amount1,
            this.api.bank.verify.amount2
          ]
        }
      })
      // .catch(err => this.api.bank.error = err)
      .then(result => this.api.bank.verifyResponse = tryParse(result))
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
    ++this.api.source_update.load

    request({
      url,
      post: shallowClone,
      authorizationBearer: this.storage.privateKey
    }).then(result => {
      this.api.source_update.result = tryParse(result)
      this.api.source_update.resultAt = Date.now()
    })
      .catch(err => this.api.source_update.error = err)
      .finally(() => --this.api.source_update.load)
  }

  sendPaymentMethodUpdate(data: any, id: string) {
    const shallowClone = {...data}
    delete shallowClone.id; // just incase left over from text area

    const base = stripeServer + 'payment_methods/'
    const url = base + id;
    ++this.api.payment_method_update.load

    request({
      url,
      post: shallowClone,
      authorizationBearer: this.storage.privateKey
    }).then(result => {
      this.api.payment_method_update.result = tryParse(result)
      this.api.payment_method_update.resultAt = Date.now()
    })
      .catch(err => this.api.payment_method_update.error = err)
      .finally(() => --this.api.payment_method_update.load)
  }

  updateCustomer(data: any, id: string) {
    const shallowClone = {...data}
    delete shallowClone.id; // just incase left over from text area

    const base = stripeServer + 'customers/'
    const url = base + id
    ++this.api.customer_update.load

    request({
      url,
      post: shallowClone,
      authorizationBearer: this.storage.privateKey
    }).then(result => {
      this.api.customer_update.result = tryParse(result)
      this.api.customer_update.resultAt = Date.now()
    })
      .catch(err => this.api.customer_update.error = err)
      .finally(() => --this.api.customer_update.load)
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
    ++this.api.customer_attach_method.load

    request({
      url: `${stripeServer}payment_methods/${paymentMethod.id}/attach`,
      post: {
        customer: customerId
      },
      authorizationBearer: this.storage.privateKey
    }).then(result => {
      this.api.customer_attach_method.result = tryParse(result)
      this.api.customer_attach_method.resultAt = Date.now()
    })
      .catch(err => this.api.customer_attach_method.error = err)
      .finally(() => --this.api.customer_attach_method.load)
  }

  detachCustomerPayMethod(
    paymentMethod: stripe.paymentMethod.PaymentMethod
  ) {
    ++this.api.customer_detach_method.load
    request({
      url: `${stripeServer}payment_methods/${paymentMethod.id}/detach`,
      method: 'POST',
      authorizationBearer: this.storage.privateKey
    }).then(result => {
      this.api.customer_detach_method.result = tryParse(result)
      this.api.customer_detach_method.resultAt = Date.now()
    })
      .catch(err => this.api.customer_detach_method.error = err)
      .finally(() => --this.api.customer_detach_method.load)
  }

  copyText(text: string) {
    copyText(text)
  }

  updateStorageMeta(stringData: string) {
    this.storage.metadata = JSON.parse(stringData)
  }

  setCardElements(element: any) {
    this.cardElement = element
    this.log('card mounted')
  }

  async confirmPayIntent() {
    const return_url = this.api.confirm_pay_intent.data.return_url // window.location.href

    try {
      const result = await this.stripe.confirmCardPayment(
        this.api.confirm_pay_intent.data.client_secret,
        {
          payment_method: {card: this.cardElement}, return_url
        },
        // Disable the default next action handling.
        {handleActions: false}
      )

      if (result.error) {
        this.api.confirm_pay_intent.error = result.error
        if (result.error.code === 'incomplete_number') {
          this.api.confirm_pay_intent.error.stripe_angular_help = 'You need to fill out the card form to prove card is in hand'
        }
        return result
      }

      this.api.confirm_pay_intent.result = result
    } catch (err) {
      this.api.confirm_pay_intent.error = err
    }
  }
}

interface BankData {
  data: stripe.BankAccountTokenOptions,
  verify: {amount1?: number, amount2?: number},
  verifyResponse?: any,
  token?: any
}

function getApis () {
  const confirm_pay_intent: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    load: 0,
    request: {
      method: 'POST',
      path: 'confirm/'
    },
    data: {
      client_secret: "",
      return_url: window.location.href
    }
  }

  // Server side only below

  // ach token data
  const bank: BankData = {
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
  const customer: ISimpleRouteEditor = {
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

  const customer_update: ISimpleRouteEditor = {
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

  const customer_get: ISimpleRouteEditor = {
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

  const get_paymethods: ISimpleRouteEditor = {
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

  const customer_attach_method: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    request: {
      method: 'POST',
      path: 'payment_methods/${paymentMethod.id}/attach'
    },
    load: 0,
    data: {} // not used currently
  }

  const customer_detach_method: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    request: {
      method: 'POST',
      path: 'payment_methods/${paymentMethod.id}/detach'
    },
    load: 0,
    data: {} // not used currently
  }

  const customer_get_sources: ISimpleRouteEditor = {
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

  const source_get: ISimpleRouteEditor = {
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

  const source_update: ISimpleRouteEditor = {
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

  const payment_method_get: ISimpleRouteEditor = {
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

  const payment_method_update: ISimpleRouteEditor = {
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

  const payintent: ISimpleRouteEditor = {
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

  const payintent_retrieve: ISimpleRouteEditor = {
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

  const payintent_cancel: ISimpleRouteEditor = {
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

  const charge: ISimpleRouteEditor = {
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

  const testHeader: ISimpleRouteEditor = {
    $send: new EventEmitter(),
    load: 0,
    data: {}
  }

  return {
    confirm_pay_intent,

    // server sides
    bank, customer,
    customer_update,
    customer_get,
    get_paymethods,
    customer_attach_method,
    customer_detach_method,
    customer_get_sources,
    source_get,
    source_update,
    payment_method_get,
    payment_method_update,
    payintent,
    payintent_retrieve,
    payintent_cancel,
    charge,
    testHeader,
  }
}
