import { Component } from "@angular/core"
import { string as demoTemplate } from "./templates/app.component.template"
import { StripeScriptTag } from "stripe-angular"
import * as packageJson from "stripe-angular/package.json"
import { BankData, getApis, simpleMenuToSmart,
  urlBased
} from './getApis.function'
import {
  RequestOptions, request, ISimpleRouteEditor, sample, localSchema, getProjectLocalStorage,
  copyText, tryParse, stripeServer, generateTestHeaderString, changeKey, SmartRouteEditor,
} from "./app.component.utils"
import { serverSide as plaidServerSide } from "./plaid.apis"

const storage: localSchema = getProjectLocalStorage()

declare const Plaid: any

@Component({
  selector:"app",
  templateUrl: './app.component.html'
}) export class AppComponent {
  stripe:stripe.Stripe
  cardElement: any // StripeJs Element (TODO: DataType this)

  version: string = (packageJson as any).version;

  loaded: boolean
  sending: boolean
  showServerMethods: boolean
  showWebhookMethods: boolean
  showPlaidMethods: boolean
  cardComplete = false
  enableServerMode?: boolean = storage.privateKey ? true : false;

  tempPublishableKey = storage.key
  tempWebhookSigningSecret = storage.webhookSigningSecret
  tempPrivateKey = storage.privateKey// localStorage?.stripeAngularPrivateKey;

  storage: localSchema = storage
  localStorage = localStorage

  lastError:Error
  card: CardsData = {}
  stripeBank:stripe.Stripe
  demoTemplate:string = demoTemplate

  localServerActive: boolean

  showMore: boolean // more documentation near title

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
  plaidServerApis = simpleMenuToSmart(plaidServerSide)
  stripeUrlApis = simpleMenuToSmart(urlBased)

  changeKey = changeKey
  copyText = copyText

  constructor(public StripeScriptTag: StripeScriptTag){
    this.checkLocalServer()

    this.api.confirm_pay_intent.$send.subscribe(data => this.confirmPayIntent())

    // server sides?
    this.api.source_update.$send.subscribe(data => this.sendSourceUpdate(data, data.id))
    this.api.payment_method_update.$send.subscribe(data => this.sendPaymentMethodUpdate(data, data.id))
    this.api.payment_method_get.$send.subscribe(data => this.getPaymentMethod(data.id))
    this.api.customer_get.$send.subscribe(data => this.getCustomer(data.id))
    this.api.customer_get_sources.$send.subscribe(data => this.getCustomerSources(data.id))
    this.api.get_paymethods.$send.subscribe(data => this.getPaymentMethods(data as any))
    this.api.customer_update.$send.subscribe(data => this.updateCustomer(data, data.id))
    this.api.payintent.$send.subscribe(data => this.createPayIntent(data))
    this.api.payintent_retrieve.$send.subscribe(data => this.retrievePayIntent(data.id))
    this.api.payintent_cancel.$send.subscribe(data => this.cancelPayIntent(data.id))
    this.api.testHeader.$send.subscribe(data => this.createTestHeader(data))

    // plaid
    this.api.plaid_createPublicToken.$send.subscribe(data => this.plaidCreateModal(data))

    Object.values(this.stripeUrlApis)
      .forEach(api =>
        api.$send.subscribe(data => this.stripeRouteRequest(api,data))
      )

      Object.values(this.plaidServerApis)
      .forEach(api =>
        api.$send.subscribe(data => this.plaidRouteRequest(api,data))
      )

    if (Object.keys(storage.metadata).length) {
      this.defaultMetadata(storage.metadata)
    }
  }

  checkLocalServer() {
    return request({url: 'http://localhost:3000/health-check'})
    .then((res: {name: string}) =>
      this.localServerActive = res?.name === 'stripe-angular'
    )
    .catch(() => {
      console.warn('Connection to local server unavailable')
      this.localServerActive = false
    })
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
    storage.plaid = storage.plaid || {}

    this.api.customer_update.data.metadata = meta
    this.stripeUrlApis.create_customer.data.metadata = meta
    this.api.payintent.data.metadata = meta
    this.stripeUrlApis.charge.data.metadata = meta
    this.extraData.metadata = meta;
    (this.api.bank.data as any).metadata = meta
  }

  ngOnInit(){
    console.log(22)
    // inject script tag onto document and save
    this.save()
    .then( () => this.loaded=true )
    .catch(e=>{
      console.log(33)
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

    this.storage.webhookSigningSecret = this.tempWebhookSigningSecret || this.storage.webhookSigningSecret
    this.storage.privateKey = this.tempPrivateKey || this.storage.privateKey
        const storeLocally = saveKeyLocally || savePrivateKeyLocally || this.storage.saveRequestsLocal
    if (storeLocally) {
      const cloneStorage = this.getSaveableStorage()
      const storageString = JSON.stringify(cloneStorage)
      localStorage.stripeAngular = storageString

      cloneStorage.privateKey = this.storage.privateKey?.length // never show

      // this.log('saved to localStorage', cloneStorage)
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
      delete storage.webhookSigningSecret
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

  log(...args) {
    console.log(...args);
  }

  toggleServerMode() {
    if (this.enableServerMode) {
      if (confirm('Confirm to delete secrets and private keys')) {
        delete this.showServerMethods
        localStorage.stripeAngularPrivateKey = null
        delete localStorage.stripeAngularPrivateKey
        delete this.tempPrivateKey
        delete this.storage.privateKey
        delete this.storage.webhookSigningSecret
        // delete this.tempPublishableKey
        this.save()
        return this.enableServerMode = false
      }
    }

    this.enableServerMode = true
  }

  getPaymentMethod(id: string) {
    return stripeRequestByRouter(this.api.payment_method_get, {id, privateKey: this.storage.privateKey})
  }

  getCustomer(id: string) {
    return stripeRequestByRouter(this.api.customer_get, {id, privateKey: this.storage.privateKey})
  }

  getPaymentMethods(query: stripe.PaymentMethodData) {
    return stripeRequestByRouter(this.api.get_paymethods, {query: query as any, privateKey: this.storage.privateKey})
      .then(() => {
        if (!this.api.payment_method_get.result && this.api.get_paymethods.result?.data?.length) {
          this.api.payment_method_get.result = this.api.get_paymethods.result.data[0]
        }
      })
  }

  getCustomerSources(id: string) {
    return stripeRequestByRouter(this.api.customer_get_sources, {id, privateKey: this.storage.privateKey})
  }

  createPayIntent(data: any) {
    return stripeRequestByRouter(this.api.payintent, {post: data, privateKey: this.storage.privateKey})
      .then(() => {
        // mirror result
        this.api.payintent_retrieve.result = this.api.payintent.result
        this.api.payintent_retrieve.resultAt = this.api.payintent.resultAt
      })
  }

  stripeRouteRequest(route: SmartRouteEditor, post: any) {
    return stripeRequestByRouter(route, {post, privateKey: this.storage.privateKey})
  }

  // local server communications
  plaidRouteRequest(route: SmartRouteEditor, data: any) {
    this.storage.plaid = this.storage.plaid || {}

    const cloneData = {
      ...data,
    }

    if (cloneData.data) {
      cloneData.data = {...cloneData.data}
      cloneData.data = {
        client_id: this.storage.plaid.client_id,
        secret: this.storage.plaid.secret,
        ...cloneData.data
      }
    }

    return requestByRouter(route, {json:cloneData})
  }

  plaidCreateModal(configs: any) {
    ++this.api.plaid_createPublicToken.load

    const pasteConfig = {
      onSuccess: (public_token, metadata) => {
        --this.api.plaid_createPublicToken.load
        this.api.plaid_createPublicToken.result = {
          public_token: public_token,
          metadata: metadata,
        }
      },
      onExit: (err, metadata) => {
        --this.api.plaid_createPublicToken.load
        this.api.plaid_createPublicToken.error = err
        this.api.plaid_createPublicToken.result = {metadata}
      },
      /*
      onLoad: () => {},
      onEvent: (eventName, metadata) => {
      },*/
    }

    Plaid.create({...pasteConfig, ...configs}).open()
  }

  retrievePayIntent(id: string) {
    return stripeRequestByRouter(this.api.payintent_retrieve, {id, privateKey: this.storage.privateKey})
  }

  cancelPayIntent(id: string) {
    return stripeRequestByRouter(this.api.payintent_cancel, {
      id, privateKey: this.storage.privateKey,
      post: {
        cancellation_reason: this.api.payintent_cancel.data.cancellation_reason
      }
    })
  }

  sendSourceUpdate(data: any, id: string) {
    const shallowClone = {...data}
    delete shallowClone.id; // just incase left over from text area
    return stripeRequestByRouter(this.api.source_update, {post: shallowClone, id, privateKey: this.storage.privateKey})
  }

  sendPaymentMethodUpdate(data: any, id: string) {
    const shallowClone = {...data}
    delete shallowClone.id; // just incase left over from text area

    return stripeRequestByRouter(this.api.payment_method_update, {post: shallowClone, id, privateKey: this.storage.privateKey})
  }

  updateCustomer(data: any, id: string) {
    const shallowClone = {...data}
    delete shallowClone.id; // just incase left over from text area

    return stripeRequestByRouter(this.api.customer_update, {post: shallowClone, id, privateKey: this.storage.privateKey})
  }

  // a source or token converted into a customer
  createCustomerByToken(token: stripe.Token) {
    const customer = this.stripeUrlApis.create_customer.data;
    customer.source = token.id;
    // customer.payment_method = token.id; // does NOT work
    this.createCustomer(customer);
  }

  createCustomer(data: any) {
    return stripeRequestByRouter(this.stripeUrlApis.create_customer, {post: data, privateKey: this.storage.privateKey})
  }

  /** TODO: upgrade to newer simpleRouteEditor */
  verifyBank() {
    const bankApi: BankData = this.api.bank as any
    const base = stripeServer + 'customers/'
    const cusId = this.stripeUrlApis.create_customer.result.id;
    const bankId = bankApi.token.bank_account.id;
    const url = base + `${cusId}/sources/${bankId}/verify`;

    request({
        url, authorizationBearer: this.storage.privateKey,
        post: {
          amounts:[
            bankApi.verify.amount1,
            bankApi.verify.amount2
          ]
        }
      })
      .then(result => bankApi.verifyResponse = tryParse(result))
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

export interface CardsData {
  token?:any
  source?:any
  payment_method?: stripe.paymentMethod.PaymentMethod
}

export interface RouterRequestOptions {
  baseUrl?: string
  post?: any,
  json?: any,
  id?: string,
  query?: Record<string, string | number>
  request?: RequestOptions
}

function resultSetter(
  route: SmartRouteEditor
): (res: any) => SmartRouteEditor {
  return (res) => {
    const parsed = tryParse(res)
    route.resultAt = Date.now()

    if (parsed.error) {
      route.error = parsed.error
      throw parsed.error
    }

    delete route.error
    route.result = parsed

    return route
  }
}

function replaceStringVars(url: string, data: any): {url:string, data: any} {
  const regexp = /\$\{\s*[^\}]+\s*\}/g;
  const array = [...url.matchAll(regexp)]

  for (let index = array.length - 1; index >= 0; --index) {
    const result = array[index]
    const key = result[0].slice(2, result[0].length-1).trim() // remove brackets and trim
    console.log('key', key)
    const value = data[key];
    delete data[key] // remove from body data
    url = url.slice(0, result.index) + value + url.slice(result.index + result[0].length, url.length)
  }

  return {url, data}
}

export function requestByRouter(
  route: SmartRouteEditor,
  options: RouterRequestOptions
) {
  ++route.load

  let url: string = options.baseUrl || route.request.host || ''

  if (options.id) {
    const idSearch = /\$\{\s*id\s*\}/.exec(route.request.path)
    if (idSearch.length > 0) {
      url = url + route.request.path.slice(0, idSearch.index) + options.id + route.request.path.slice(idSearch.index + idSearch[0].length, url.length)
    } else {
      url = url + options.id
    }
  } else {
    url = url + route.request.path
  }

  const rawData = options.post || options.json
  const data = JSON.parse(JSON.stringify(rawData)) // clone

  const replaced = replaceStringVars(url, data)
  url = replaced.url


  const reqOptions: RequestOptions = {
    url, method: route.request.method,
    authorizationBearer: options.request?.authorizationBearer,
  }

  if (options.post) {
    reqOptions.post = data
  }

  if (options.json) {
    reqOptions.json = data
  }

  if (options.query) {
    const queryString = Object.keys(options.query).reduce((all, key) => all + (all.length && '&' || '') + `${key}=${options.query[key]}`,'')
    url = url + '?' + queryString
  }

  return request(reqOptions)
    .then(resultSetter(route))
    .catch(err => {
      route.error = err
      console.log('err', err)
      return Promise.reject(err)
    })
    .finally(() => --route.load)
}

interface StripeRouterRequestOptions extends RouterRequestOptions {
  privateKey: string
}

export function stripeRequestByRouter(
  route: SmartRouteEditor,
  options: StripeRouterRequestOptions
) {
  options.baseUrl = stripeServer
  options.request = options.request || {} as any
  options.request.authorizationBearer = options.privateKey
  return requestByRouter(route, options)
}