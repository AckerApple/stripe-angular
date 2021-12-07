import { Component } from "@angular/core"
import { StripeScriptTag } from "stripe-angular"
import * as packageJson from "stripe-angular/package.json"
import { bank } from "./banks.api"
import { getApis } from './getApis.function'

// TODO: end up with apis.json
import { allGroups } from './apis'
//import * as allGroups from './apis.json'

import {
  RequestOptions, request, sample, localSchema, getProjectLocalStorage,
  copyText, tryParse, stripeServer, generateTestHeaderString, changeKey, stringInterpolations, stringIdentifiers, flatten, removeFlats, getSaveableStorage,
} from "./app.component.utils"
import { ApiGroup, SmartApiGroup, SmartRouteEditor } from "./typings"
import { simpleRouteToSmart } from "./simpleRouteToSmart.function"
import { create_customer } from "./customers.api"
import { card } from "./cards.api"
import { links } from "./links"

const storage: localSchema = getProjectLocalStorage()

declare const Plaid: any

@Component({
  selector:"app",
  templateUrl: './app.component.html'
}) export class AppComponent {
  links = links
  stripe:stripe.Stripe
  cardElement: any // StripeJs Element (TODO: DataType this)

  version: string = (packageJson as any).version;

  loaded: boolean
  sending: boolean // when stripe.js is communicating card/bank form entry
  cardComplete = false

  storage: localSchema = storage
  localStorage = localStorage

  lastError:Error
  stripeBank: stripe.Stripe

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

  // every end point within groups
  allGroups = simpleGroupsToSmart(allGroups as ApiGroup[])

  api = getApis() // common apis (UI confirm_pay_intent, web hook testHeader, and plaid_createPublicToken)
  plaidServerApis = this.allGroups.find(group => group.title === '🏦 Plaid Functionality').apis as SmartRouteEditor[]
  apiGroups = this.allGroups.find(group => group.title === '🐠 Stripe Functionality').groups

  create_customer = simpleRouteToSmart(create_customer, this.allGroups)

  changeKey = changeKey
  copyText = copyText

  testNums = [{
    number: '4000056655665556',
    icon: '⭐️',
    hint: 'visa debit',
    description: 'Recommended for most success across all functionality. Even works for external_accounts'
  },{
    number: '4242424242424242',
    hint: 'visa',
    description: 'General success. Cannot be used for **Accounts** (Card no is for credit card, only debit cards allowed)'
  },{
    number: '4000002500003155',
    icon: '✍️',
    hint: 'requires 1-time auth'
  },{
    number: '4000000000003220',
    icon: '✍️',
    hint: 'requires auth'
  },{
    number: '4000000000000259',
    icon: '🦶',
    hint: 'will dispute as fraud'
  }]

  // temp
  showApi: boolean
  showRelated: boolean

  constructor(public StripeScriptTag: StripeScriptTag){
    (card as any).result = {} // must pre-populate this

    this.checkLocalServer()

    this.api.confirm_pay_intent.smarts.$send.subscribe(data => this.confirmPayIntent())
    this.api.testHeader.smarts.$send.subscribe(data => this.createTestHeader(data))

    // listen to results to flatten
    Object.values(this.api).forEach(api => this.subApi(api))

    // plaid
    this.api.plaid_createPublicToken.smarts.$send.subscribe(data => this.plaidCreateModal(data))

    // route all stripe requests
    this.subToStripeApiGroups(this.apiGroups)

    // route all plaid requests
    Object.values(this.plaidServerApis)
      .forEach(api =>
        this.subApi(api) && api.smarts.$send.subscribe(data => this.plaidRouteRequest(api,data))
      )

    if (Object.keys(storage.metadata).length) {
      this.defaultMetadata(storage.metadata)
    }

    storage.plaid = storage.plaid || {}
  }

  downloadAllGroupsJson() {
    download('apis.json', this.getAllGroupsJson())
  }

  getAllGroupsJson() {
    const json = JSON.stringify(this.getAllGroupsSave(), null, 2)
    return json
  }

  getAllGroupsSave() {
    return getAllGroupsSave(this.allGroups)
  }

  subToStripeApiGroups(groups) {
    // route all stripe requests
    groups.forEach(group => {
      if (group.groups) {
        this.subToStripeApiGroups(group.groups)
      }

      group.apis.forEach((api: SmartRouteEditor) =>
        this.subApi(api) && api.smarts.$send.subscribe(data => this.stripeRouteRequest(api,data))
      )
    })
  }

  async ngOnInit() {
    try {
      await this.tryLoadStripe()
      this.loaded = true
    } catch (err) {
      this.lastError = err
      return Promise.reject(err)
    }

    if (typeof Plaid === 'undefined') {
      console.warn('🏦 Plaid JS has not been loaded!')
    }
  }

  async tryLoadStripe() {
    return this.loadStripe()
  }

  save() {
    const saveKeyLocally = this.storage.saveKeyLocally
    const savePrivateKeyLocally = this.storage.savePrivateKeyLocally

    const storeLocally = saveKeyLocally || savePrivateKeyLocally || this.storage.saveRequestsLocal
    if (storeLocally) {
      this.write()
      this.log('💾 wrote to localStorage')
    } else {
      this.log('⏭ skipped writing localStorage')
    }

    return this.tryLoadStripe()
  }

  write(): void {
    const cloneStorage = getSaveableStorage(this.storage)
    const storageString = JSON.stringify(cloneStorage)
    localStorage.stripeAngular = storageString
  }

  loadStripe(): Promise<stripe.Stripe> {
    return this.StripeScriptTag.setPublishableKey(this.storage.key || 'xyz')
    .then(stripe => {
      this.stripe=stripe
      setTimeout(() => this.loaded = true, 200)
      return stripe
    });
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

  subApi(api: SmartRouteEditor) {
    // listen to results to flatten
    api.smarts.$result.subscribe(_data => this.afterApiResult(api))
    return api
  }

  afterApiResult(api: SmartRouteEditor) {
    this.flatten(api)

    api.smarts.related.forEach(related => {
      const value = api[ related.relation.valueKey ]
      let valid = true

      if (related.relation.valueMatches) {
        valid = related.relation.valueMatches.every(test => {
          if (test.valueKey) {
            return api[ test.valueKey ].search(new RegExp(test.expression, 'gi')) >= 0
          }

          return value.search(new RegExp(test.expression, 'gi')) >= 0
        }) ? true : false
      }

      related.show = valid
    })
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

    const metaCheck = (data: any) => {
      if (data?.metadata) {
        data.metadata = meta
      }

      // loop an object looking for submetadata. Warn: not circular reference protected (👀 seen)
      if (isObject(data)) {
        Object.values(data).forEach(subData => {
          if (isObject(subData)) {
            metaCheck(subData)
          }
        })
      }
    }

    const applyMeta = api => {
      if (api.examples) {
        api.examples.map(x => x.data).forEach(metaCheck)
      }

      metaCheck(api.data)
    }

    const applyGroupMetadata = group => {
      if (group.groups) {
        group.groups.forEach(applyGroupMetadata)
      }

      group.apis.forEach(applyMeta)
    }
    this.apiGroups.forEach(applyGroupMetadata)

    this.extraData.metadata = meta;
    (this.api.bank.data as any).metadata = meta
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

  stripeRouteRequest(route: SmartRouteEditor, post: any) {
    return stripeRequestByRouter(route, {post, privateKey: this.storage.privateKey})
  }

  flatten(ob: any) {
    removeFlats(ob) // remove any previous dot notations to ensure those value updated
    // a limited set of fields to flatten
    const limitedCopy = {
      result:ob.result,
      data:ob.data,
      request:ob.request
    }
    flatten(limitedCopy, ob) // only flatten known changing parts of a route (avoid flattening "pastes")
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
    this.log('🏦 Creating Plaid modal...')
    ++this.api.plaid_createPublicToken.smarts.load

    const pasteConfig = {
      onSuccess: (public_token, metadata) => {
        --this.api.plaid_createPublicToken.smarts.load
        const result = {
          public_token: public_token,
          metadata: metadata,
        }
        this.api.plaid_createPublicToken.result = result
        this.api.plaid_createPublicToken.smarts.$result.next(result)
      },
      onExit: (err, metadata) => {
        if (err) {
          console.error(err)
        }

        --this.api.plaid_createPublicToken.smarts.load
        this.api.plaid_createPublicToken.error = err
        const result = {metadata}
        this.api.plaid_createPublicToken.result = result
        this.api.plaid_createPublicToken.smarts.$result.next(result)
      },
      /*
      onLoad: () => {},
      onEvent: (eventName, metadata) => {
      },*/
    }

    Plaid.create({...pasteConfig, ...configs}).open()
    this.log('🏦 Plaid modal created')
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
    const bankId = (bank as any).result.bank_account.id;
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
    route.smarts.resultAt = Date.now()

    if (parsed.error) {
      route.error = parsed.error
      throw parsed.error
    }

    delete route.error
    route.result = parsed
    route.smarts.$result.next(route)

    return route
  }
}

function replaceStringVars(url: string, data: any): {url:string, data: any} {
  // ${interpolations}
  const regexp = stringInterpolations
  const array = [...url.matchAll(regexp)]
  for (let index = array.length - 1; index >= 0; --index) {
    const result = array[index]
    const key = result[0].slice(2, result[0].length-1).trim() // remove brackets and trim
    const value = data[key]
    // delete data[key] // remove from body data
    url = url.slice(0, result.index) + value + url.slice(result.index + result[0].length, url.length)
  }

  // :identifiers
  const idRegexp = stringIdentifiers
  const idArray = [...url.matchAll(idRegexp)]
  for (let index = idArray.length - 1; index >= 0; --index) {
    const result = idArray[index]
    const key = result[0].slice(2, result[0].length).trim() // remove :
    const value = data[key]
    url = url.slice(0, result.index+1) + value + url.slice(result.index + result[0].length, url.length)
  }

  return {url, data}
}

export function requestByRouter(
  route: SmartRouteEditor,
  options: RouterRequestOptions
) {
  delete route.result
  delete route.error

  if (!route.request) {
    return console.warn('not an api request')
  }

  ++route.smarts.load

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
  const data = rawData ? JSON.parse(JSON.stringify(rawData)) : {} // clone

  const params = route.request.params
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
    .finally(() => --route.smarts.load)
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

function simpleGroupsToSmart(groups: ApiGroup[]) {
  const groupMapper = group => {
    if (group.groups) {
      group.groups = group.groups.map(groupMapper)
    }

    if (group.apis) {
      group.apis = group.apis.map(api => simpleRouteToSmart(api, groups)) as any
    }

    return group
  }

  return groups.map(groupMapper)
}

function isObject(obj: any) {
  return obj && typeof(obj) === 'object' && !(obj instanceof Array)
}

function getAllGroupsSave(groups: SmartApiGroup[]) {
  return groups.map(group => {
    const newGroup = {...group}

    // remove apis smarts
    if (newGroup.apis) {
      newGroup.apis = newGroup.apis.map(api => {
        const newApi = {...api}
        delete newApi.smarts
        delete newApi.result

        Object.keys(newApi).forEach(key => {
          if (key.indexOf('result.') === 0
          || key.indexOf('request.') === 0
          ) {
            delete newApi[key]
          }
        })

        return newApi
      })
    }

    // recurse
    if (newGroup.groups) {
      newGroup.groups = getAllGroupsSave(newGroup.groups)
    }

    return newGroup
  })
}

export function download(filename: string, text: string) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
