import { Component, ViewChild } from "@angular/core"
import { StripeScriptTag } from "stripe-angular"
import packageJson from "stripe-angular/package.json"
import { bank } from "./banks.api"
import { getApis } from './getApis.function'
import { download, getAllGroupsSave, isObject, simpleGroupsToSmart, stripeRequestByRouter } from './app.utils'

// TODO: end up with apis.json
import { allGroups } from './apis'
import { localSchema, storage } from './storage'
import { request, requestByRouter, RequestOptions, RouterRequestOptions } from './request.utils'
// TODO: import * as allGroups from './apis.json'

import {
  sample, copyText, tryParse, stripeServer, flatten, removeFlats, getSaveableStorage,
} from "./app.component.utils"
import { generateTestHeaderString } from "./webhook.utils"
import { ApiGroup, SmartRouteEditor } from "./typings"
import { simpleRouteToSmart } from "./simpleRouteToSmart.function"
import { customer_create } from "./customers.api"
import { card } from "./sources.api"
import { links } from "./links"
import { getGroupByApi, GroupScope } from "./group-tools.component"

declare const Plaid: any

@Component({
  selector:"app",
  templateUrl: './app.component.html'
}) export class AppComponent {
  links = links
  cardElement: any // StripeJs Element (TODO: DataType this)
  
  // Added in by stripe-angular StripeScriptTag.ts via document.createElement('script') to https://js.stripe.com/v3/
  stripe?: stripe.Stripe

  version: string = packageJson.version

  loaded?: boolean
  sending?: boolean // when stripe.js is communicating card/bank form entry
  cardComplete = false

  storage: localSchema = storage
  localStorage = localStorage

  lastError?: Error
  
  // load the <stripe-bank> element
  @ViewChild('stripeBank', { static: true }) stripeBank!: stripe.Stripe

  localServerActive?: boolean
  apiEditorMode?: boolean // api json editor functionality

  showMore?: boolean // more documentation near title

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

  create_customer = simpleRouteToSmart(customer_create, this.allGroups)

  editConfig?: boolean
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
  // showApi: boolean
  // showRelated: boolean
  groupsScope: GroupScope = {level: 0}

  constructor(public StripeScriptTag: StripeScriptTag){
    (card as any).result = {} // must pre-populate this

    this.checkLocalServer()

    this.hookIntoUiApis()

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

    const metadata = storage.metadata
    if (metadata && Object.keys(metadata).length) {
      this.defaultMetadata(metadata)
    }

    storage.plaid = storage.plaid || {}
  }

  hookIntoUiApis() {
    // UI only apis that we need to hook into
    this.api.confirm_pay_intent.smarts.$send.subscribe(() => this.confirmPayIntent())
    this.api.testHeader.smarts.$send.subscribe(data => this.createTestHeader(data))
    this.api.webhookPost.smarts.$send.subscribe(data => this.sendWebhookPost(data))
    this.api.bank.smarts.$send.subscribe(async data => {      
      try {
        const result = await this.stripeBank.createToken(this.api.bank.data as any)
        this.api.bank.smarts.$result.next(result)
      } catch (err) {
        this.api.bank.error = err
      }
    })

    this.api.collectFinancialConnectionsAccounts.smarts.$send.subscribe(async data => {
      if ( !data.clientSecret ) {
        this.api.collectFinancialConnectionsAccounts.error = 'clientSecret is required'
        return
      }

      try {
        const result = await (this.stripe as any).collectFinancialConnectionsAccounts(data)
        if (result.error) {
          this.api.collectFinancialConnectionsAccounts.error = result.error
          return
        } else if (result.financialConnectionsSession.accounts.length === 0) {
          this.api.collectFinancialConnectionsAccounts.error = 'No accounts were linked'
        }

        this.api.collectFinancialConnectionsAccounts.result = result
        this.api.collectFinancialConnectionsAccounts.smarts.$result.next(result)
      } catch (err) {
        this.api.collectFinancialConnectionsAccounts.error = err
      }
    })

    this.api.collectBankAccountToken.smarts.$send.subscribe(async data => {
      if ( !data.clientSecret ) {
        this.api.collectBankAccountToken.error = 'clientSecret is required'
        return
      }

      try {
        const result = await (this.stripe as any).collectBankAccountToken(data)
        if (result.error) {
          this.api.collectBankAccountToken.error = result.error
          return
        } else if (result.financialConnectionsSession.accounts.length === 0) {
          this.api.collectBankAccountToken.error = 'No accounts were linked'
        }

        this.api.collectBankAccountToken.result = result
        this.api.collectBankAccountToken.smarts.$result.next(result)
      } catch (err) {
        this.api.collectBankAccountToken.error = err
      }
    })
  }

  getGroupByApi(api: SmartRouteEditor, _group: ApiGroup[]) {
    const result = getGroupByApi(api, this.allGroups)
    this.groupsScope = result
  }

  sendWebhookPost(data: any) {
    const stripeHeader = this.createTestHeader(data)

    const requestOptions: RequestOptions = {
      url: storage.webhookServer,
      headers: {
        "stripe-signature": stripeHeader
      }
    }
    
    const options: RouterRequestOptions = {
      // post: data,
      json: data,
      baseUrl: storage.webhookServer,
      request: requestOptions,
    }
    // options.request.authorizationBearer = options.privateKey

    return requestByRouter(this.api.webhookPost, options)
  }

  saveApisJson() {
    request({
      url:'http://localhost:3000/save-apis',
      method: 'POST',
      json: this.getAllGroupsSave()
    })
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
    } catch (err: any) {
      this.lastError = err
      return Promise.reject(err)
    }

    if (typeof Plaid === 'undefined') {
      console.warn('🟠 🏦 Plaid JS has not been loaded!')
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
      this.stripe = stripe
      setTimeout(() => this.loaded = true, 200)
      return stripe
    });
  }

  changeSourceRequest(data:string){
    let source;

    const requests = this.storage.requests
    if ( !requests ) {
      return
    }

    try {
      source = requests.source = JSON.parse(data)
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
      requests.source = source
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
      const index = related.relation.valueKey as string
      const value = api[ index ]
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

  async checkLocalServer() {
    try {
      const res: {name: string} = await request({
        url: 'http://localhost:3000/health-check'
      }) as any
      this.localServerActive = res?.name === 'stripe-angular'
    } catch (err) {
      console.warn('🟠 Connection to local server unavailable')
      this.localServerActive = false
    }
  }

  createTestHeader(data: any): string {
    const payload = JSON.stringify(data)
    const result = generateTestHeaderString({
      payload, secret: this.storage.webhookSigningSecret
    })

    // const result = stripe.webhooks.generateTestHeaderString(data)
    this.api.testHeader.result = {result}

    return result
  }

  /** crawls all data points that may contain metadata and converts to set metadata */
  defaultMetadata(meta: Record<string, any>) {
    const requests = storage.requests
    
    if ( !requests ) {
      return
    }

    requests.source.metadata = meta
    requests.paymentMethod.metadata = meta

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

    const applyMeta = (api: SmartRouteEditor) => {
      if (api.examples) {
        api.examples.map(x => x.data).forEach(metaCheck)
      }
      
      if (api.smarts?.pastes) {
        api.smarts.pastes.map(x => x.value).forEach(metaCheck)
    }

      metaCheck(api.data)
    }

    const applyGroupMetadata = group => {
      if (group.groups) {
        group.groups.forEach(applyGroupMetadata)
      }

      if (group.apis) {
        group.apis.forEach(applyMeta)
      }
    }
    // this.apiGroups.forEach(applyGroupMetadata)
    this.allGroups.forEach(applyGroupMetadata)

    this.extraData.metadata = meta;
    (this.api.bank.data as any).metadata = meta
  }

  changePaymentMethodRequest(data:string){
    const requests = this.storage.requests
    
    if ( !requests ) {
      return
    }

    const pmr = requests.paymentMethod = JSON.parse(data)

    if (pmr.metadata) {
      this.extraData.metadata = pmr.metadata
    }

    if (this.storage.saveRequestsLocal) {
      requests.paymentMethod = pmr
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
    const privateKey = this.storage.privateKey as string
    return stripeRequestByRouter(route, {post, privateKey})
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
          console.error('🔴 err', err)
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
    
    if ( !customer ) {
      return
    }
    
    customer.source = token.id;
    // customer.payment_method = token.id; // does NOT work
    this.createCustomer(customer);
  }

  createCustomer(data: any) {
    const privateKey = this.storage.privateKey as string
    return stripeRequestByRouter(this.create_customer, {
      post: data, privateKey })
  }

  /** TODO: upgrade to newer simpleRouteEditor */
  verifyBank() {
    const base = stripeServer + 'customers/'
    const result = this.create_customer.result
    
    if ( !result ) {
      return
    }

    const cusId = result.id;
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

  setCardElements(element: any) {
    this.cardElement = element
    this.log('card mounted')
  }

  async confirmPayIntent() {
    const data = this.api.confirm_pay_intent.data
    
    if ( !data || !this.stripe ) {
      return
    }

    const return_url = data.return_url // window.location.href

    try {
      const result = await this.stripe.confirmCardPayment(
        data.client_secret,
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

  hideShowStripe() {
    delete this.stripe
    delete this.api.card.error

    setTimeout(() => {
      this.loadStripe()
    }, 1000)
  }

  valueTimers: {[index: string]: any} = {}
  startValueTimer(name, value, time=2000) {
    this.valueTimers[name] = setTimeout(() => {
      this[name] = value
    }, 2000)
  }

  stopValueTimer(name) {
    clearTimeout(this.valueTimers[name])
  }
}
