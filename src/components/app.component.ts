import { Component } from "@angular/core"
import { string as demoTemplate } from "./templates/app.component.template"
import { StripeScriptTag } from "stripe-angular"
import * as packageJson from "stripe-angular/package.json"
import { bank } from "./banks.api"
import { getApis } from './getApis.function'
import { apiGroups } from './apis'
import {
  RequestOptions, request, sample, localSchema, getProjectLocalStorage,
  copyText, tryParse, stripeServer, generateTestHeaderString, changeKey, SmartRouteEditor, stringInterpolations, simpleRouteToSmart, simpleMenuToSmart, ISimpleRouteEditor,
} from "./app.component.utils"
import { serverSide as plaidServerSide } from "./plaid.apis"
import { create_customer } from "./customers.api"

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
  cardComplete = false
  enableServerMode?: boolean = storage.privateKey ? true : false;

  showPrivateKeyChange?: boolean
  showServerMethods?: boolean
  showWebhookMethods?: boolean
  showPlaidMethods: boolean

  tempPublishableKey = storage.key
  tempWebhookSigningSecret = storage.webhookSigningSecret
  tempPrivateKey = storage.privateKey// localStorage?.stripeAngularPrivateKey;

  storage: localSchema = storage
  localStorage = localStorage

  lastError:Error
  stripeBank: stripe.Stripe
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
    currency: "usd",
    metadata: sample.metadata
  }

  create_customer = simpleRouteToSmart(create_customer)
  api = getApis()
  plaidServerApis = simpleMenuToSmart(plaidServerSide)
  apiGroups = apiGroups.map(group => {
    group.apis = group.apis.map(simpleRouteToSmart) as any
    return group
  })

  changeKey = changeKey
  copyText = copyText

  constructor(public StripeScriptTag: StripeScriptTag){
    this.checkLocalServer()

    this.api.confirm_pay_intent.$send.subscribe(data => this.confirmPayIntent())
    this.api.testHeader.$send.subscribe(data => this.createTestHeader(data))

    // listen to results to flatten
    Object.values(this.api).forEach(api => this.subApi(api))

    // plaid
    this.api.plaid_createPublicToken.$send.subscribe(data => this.plaidCreateModal(data))

    const stripeEachRouteReg = api =>
      this.subApi(api) && api.$send.subscribe(data => this.stripeRouteRequest(api,data))

    this.apiGroups.forEach(group => group.apis.forEach(stripeEachRouteReg))

    Object.values(this.plaidServerApis)
      .forEach(api =>
        this.subApi(api) && api.$send.subscribe(data => this.plaidRouteRequest(api,data))
      )

    if (Object.keys(storage.metadata).length) {
      this.defaultMetadata(storage.metadata)
    }

    storage.plaid = storage.plaid || {}
  }

  subApi(api: SmartRouteEditor) {
    // listen to results to flatten
    api.$result.subscribe(_data => this.flatten(api))
    return api
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

    const applyMeta = api => {
      if (!api.data?.metadata) {
        return
      }

      api.data.metadata = meta
    }

    apiGroups.forEach(group => group.apis.forEach(applyMeta))

    this.extraData.metadata = meta;
    (this.api.bank.data as any).metadata = meta
  }

  ngOnInit() {
    // inject script tag onto document and save
    this.save()
    .then( () => this.loaded=true )
    .catch(e => {
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

  stripeRouteRequest(route: SmartRouteEditor, post: any) {
    return stripeRequestByRouter(route, {post, privateKey: this.storage.privateKey})
  }

  flatten(ob: any) {
    removeFlats(ob) // remove any previous dot notations to ensure those value updated
    flatten(ob, ob)
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
        const result = {
          public_token: public_token,
          metadata: metadata,
        }
        this.api.plaid_createPublicToken.result = result
        this.api.plaid_createPublicToken.$result.next(result)
      },
      onExit: (err, metadata) => {
        --this.api.plaid_createPublicToken.load
        this.api.plaid_createPublicToken.error = err
        const result = {metadata}
        this.api.plaid_createPublicToken.result = result
        this.api.plaid_createPublicToken.$result.next(result)
      },
      /*
      onLoad: () => {},
      onEvent: (eventName, metadata) => {
      },*/
    }

    Plaid.create({...pasteConfig, ...configs}).open()
  }

  // a source or token converted into a customer
  createCustomerByToken(token: stripe.Token) {
    const customer = this.create_customer.data;
    customer.source = token.id;
    // customer.payment_method = token.id; // does NOT work
    this.createCustomer(customer);
  }

  createCustomer(data: any) {
    return stripeRequestByRouter(this.create_customer, {post: data, privateKey: this.storage.privateKey})
  }

  /** TODO: upgrade to newer simpleRouteEditor */
  verifyBank() {
    const base = stripeServer + 'customers/'
    const cusId = this.create_customer.result.id;
    const bankId = bank.result.bank_account.id;
    const url = base + `${cusId}/sources/${bankId}/verify`;

    request({
        url, authorizationBearer: this.storage.privateKey,
        post: {
          amounts:[
            bank.verify.amount1,
            bank.verify.amount2
          ]
        }
      })
      .then(result => bank.verifyResponse = tryParse(result))
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
        this.flatten(this.api.confirm_pay_intent)
        return result
      }

      this.api.confirm_pay_intent.result = result
      this.flatten(this.api.confirm_pay_intent)
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
    route.$result.next(route)

    return route
  }
}

function replaceStringVars(url: string, data: any): {url:string, data: any} {
  const regexp = stringInterpolations
  const array = [...url.matchAll(regexp)]

  for (let index = array.length - 1; index >= 0; --index) {
    const result = array[index]
    const key = result[0].slice(2, result[0].length-1).trim() // remove brackets and trim
    const value = data[key]
    // delete data[key] // remove from body data
    url = url.slice(0, result.index) + value + url.slice(result.index + result[0].length, url.length)
  }

  return {url, data}
}

export function requestByRouter(
  route: SmartRouteEditor,
  options: RouterRequestOptions
) {
  delete route.result
  delete route.error
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

  const rawData = options.post || options.json || route.data
  const params = route.request.params
  const data = rawData ? JSON.parse(JSON.stringify(rawData)) : {} // clone

  const replaced = replaceStringVars(url, params)
  url = replaced.url

  let headers = route.request.headers

  if (route.request.removeHeaderValues) {
    headers = JSON.parse(JSON.stringify(headers)) // clone before deletes occur
    Object.entries(headers).forEach(([key, value]) => {
      if (route.request.removeHeaderValues.includes(value)) {
        delete headers[key]
      }
    })
  }

  const reqOptions: RequestOptions = {
    url, method: route.request.method, headers,
    authorizationBearer: options.request?.authorizationBearer,
  }

  if (options.post) {
    reqOptions.post = data
  }

  if (options.json) {
    reqOptions.json = data
  }

  // GET convert POST to query params
  if (route.request.method === 'GET' && reqOptions.post) {
    options.query = reqOptions.post
  }

  if (options.query) {
    const queryString = Object.keys(options.query).reduce((all, key) => all + (all.length && '&' || '') + `${key}=${options.query[key]}`,'')
    reqOptions.url = reqOptions.url + '?' + queryString
  }

  return request(reqOptions)
    .then(resultSetter(route))
    .catch(err => {
      route.error = err
      console.error('err', err)
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

export function removeFlats<T>(data: T): T {
  const removes = Object.keys(data).filter(key => key.indexOf('.')>=0)
  removes.forEach(key => delete data[key])
  return data
}

export function flatten<T>(
  data: T, response = data,
  {
    flatKey = "", onlyLastKey = false, seen = [], original = data
  }: {
    flatKey?: string,
    onlyLastKey?: boolean, // text key value display (instead of x.y.z just get z)
    seen?: any[], original?: T
  } = {}
) {
  const entries = Object.entries(data)
  for (const [key, value] of entries) {
    let newFlatKey;
    if (!isNaN(parseInt(key)) && flatKey.includes("[]")) {
      newFlatKey = (flatKey.charAt(flatKey.length - 1) == "." ? flatKey.slice(0, -1) : flatKey) + `[${key}]`;
    } else if (!flatKey.includes(".") && flatKey.length > 0) {
      newFlatKey = `${flatKey}.${key}`;
    } else {
      newFlatKey = `${flatKey}${key}`;
    }

    const isValObject = typeof value === "object" && value !== null && Object.keys(value).length > 0
    if (isValObject && !seen.includes(value) && value !== original) {
      seen.push(value)
      flatten(value, response, {flatKey: `${newFlatKey}.`, onlyLastKey, seen, original});
    } else {
      if(onlyLastKey){
        newFlatKey = newFlatKey.split(".").pop();
      }
      if (Array.isArray(response)) {
        response.push({
          [newFlatKey.replace("[]", "")]: value
        });
      } else {
        response[newFlatKey.replace("[]", "")] = value;
      }
    }
  }
  return response;
}
