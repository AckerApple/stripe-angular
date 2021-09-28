/*
export { bank } from "./banks.api"
export { apisMap as cardApis, card } from "./cards.api"
// export { apisMap as customerApis } from "./customers.api"
export { plaid_stripeBankCreate } from "./plaid.apis"
*/

import { EventEmitter } from "@angular/core"
import { ISimpleRouteEditor, sample, simpleMenuToSmart, SmartRouteEditor } from "./app.component.utils"

import { plaid_createPublicToken } from './plaid.apis'
import { transfer_create } from './transfers.api'
import { bank } from './banks.api'
import { customer_get, create_customer, customer_attach_source } from './customers.api'
import { payment_method_update, get_paymethods, source_get, source_update, card, create_source, delete_source, payment_method_get } from "./cards.api"

const testHeader: ISimpleRouteEditor = {
  data: {}
}

export const balance_get: ISimpleRouteEditor = {
  title: '💵 Balance',
  link: 'https://stripe.com/docs/api/balance/balance_retrieve',
  description: 'Retrieves the current account balance, based on the authentication that was used to make the request',
  request: {
    method: 'GET',
    path: 'balance'
  },
  data: {
  }
}

const payintent_create: ISimpleRouteEditor = {
  title: '💸 Create Pay Intent',
  link: 'https://stripe.com/docs/api/payment_intents',
  favKeys: [{
    valueKey: 'result.id',
  },{
    valueKey: 'result.client_secret'
  },{
    type: 'link', valueKey: 'result.next_action.use_stripe_sdk.stripe_js', title: 'secure payment verify link'
  }],
  request: {
    method: 'POST',
    path: 'payment_intents'
  },
  data: {
    amount: 999,
    confirm: 'true',
    currency: 'usd',
    setup_future_usage: 'off_session',
    metadata: sample.metadata
  },
  pastes: [{
    $api: () => create_customer,
    getTitle: () => 'customer '+create_customer.result.description,
    valueKey: 'result.id',
    pasteKey: 'data.customer'
  },{
    $api: () => customer_get,
    getTitle: () => 'GET customer ' + customer_get.data.id,
    valueKey: 'data.id',
    pasteKey: 'data.customer',
  },{
    $api: () => card,
    getTitle: () => 'method ' + card.result.payment_method?.card.brand+' '+card.result.payment_method.card.last4,
    valueKey: 'result.payment_method.id',
    pasteKey: 'data.payment_method',
  },{
    $api: () => card,
    getTitle: () => 'source '+card.result.source?.card?.brand+' '+card.result.source.card.last4,
    valueKey: 'result.source.id',
    pasteKey: 'data.payment_method',
  },{
    $api: () => card,
    getTitle: () => 'token '+card.result.token.card.brand+' '+card.result.token.card.last4,
    valueKey: 'result.token.card.id',
    pasteKey: 'data.payment_method',
  },{
    $api: () => payment_method_get,
    getTitle: () => 'method '+payment_method_get.result.brand+' '+payment_method_get.result.last4,
    valueKey: 'result.id',
    pasteKey: 'data.payment_method',
  },{
    $api: () => payment_method_get,
    title:'pay method customer',
    valueKey: 'result.customer',
    pasteKey: 'data.customer',
  }]
}

const payintent_retrieve: ISimpleRouteEditor = {
  title: '💸 Retrieve Pay Intent',
  link: 'https://stripe.com/docs/api/payment_intents/retrieve',
  request: {
    method: 'GET',
    path: 'payment_intents/${id}'
  },
  pastes: [{
    $api: () => payintent_create,
    getTitle: () => payintent_create.result.id,
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  }]
}

const confirm_pay_intent: ISimpleRouteEditor = {
  title: '🤝 Confirm Pay Intent',
  link: 'https://stripe.com/docs/payments/3d-secure#confirm-payment-intent',
  description: 'If a pay intent requires verification, use the form below',
  favKeys: [{
    valueKey: 'result.id'
  }, {
    title: 'secure payment verify link', valueKey:'result.paymentIntent.next_action.redirect_to_url.url', type: 'link'
  }],
  request: {
    method: 'POST',
    path: 'confirm'
  },
  data: {
    client_secret: "",
    return_url: window.location.href
  },
  pastes: [{
    $api: () => payintent_retrieve,
    getTitle: () => 'pay intent client_secret',
    pasteKey: 'data.client_secret',
    valueKey: 'result.client_secret',
  },{
    $api: () => payintent_create,
    getTitle: () => 'created pay intent',
    pasteKey: 'data.client_secret',
    valueKey: 'result.client_secret',
  }]
}
const payintent_cancel: ISimpleRouteEditor = {
  title: '🚫 💸 Cancel Pay Intent',
  link: 'https://stripe.com/docs/api/payment_intents/cancel',
  request: {
    method: 'POST',
    path: 'payment_intents/${id}/cancel'
  },
  data: {
    id: '',
    cancellation_reason: 'requested_by_customer', // duplicate, fraudulent, requested_by_customer, or abandoned
  }
}

export const charge: ISimpleRouteEditor = {
  title: '💵 Create Charge',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/charges'
  },{
    url: 'https://stripe.com/docs/payments/payment-intents/migration/charges',
    title: 'prefer pay intents'
  }],
  favKeys: [{valueKey: 'result.id'}],
  request: {
    method: 'POST',
    path: 'charges'
  },
  data: {
    amount: 999,
    currency: 'usd',
    metadata: sample.metadata
  },
  pastes: [{
    $api: () => create_customer,
    getTitle: () => 'customer bank ' + create_customer.result.sources.data[0].bank_name + ' ' + create_customer.result.sources.data[0].last4,
    valueKey: 'result.sources.data.0.bank_name',
    pasteKey: 'data.source',
  },{
    $api: () => create_source,
    valueKey: 'result.id',
    pasteKey: 'data.source',
    getTitle: () => 'source ' + create_source.result.type,
  },{
    $api: () => customer_attach_source,
    valueKey: 'result.id',
    pasteKey: 'data.source',
    getTitle: () => '👤 🏦 use attached '+ (customer_attach_source.result?.bank_name || customer_attach_source.result?.type),
  }/*,{ // does not work with payment methods
    $api: () => card,
    valueKey: 'result.payment_method.id',
    pasteKey: 'data.payment_method',
    getTitle: () => '💳 method '+card.result.payment_method?.card.brand+' '+card.result.payment_method?.card.last4,
  }*/,{
    $api: () => card,
    valueKey: 'result.token.id',
    pasteKey: 'data.source',
    getTitle: () => '🪙 token '+card.result.token.card.brand+' '+card.result.token.card.last4,
  },{
    $api: () => card,
    valueKey: 'result.source.id',
    pasteKey: 'data.source',
    getTitle: () => '💳 source '+card.result.source.card.brand+' '+card.result.source.card.last4,
  },{
    $api: () => create_customer,
    valueKey: 'result.id',
    pasteKey: 'data.customer',
    getTitle: () => '👤 customer '+create_customer.result?.description,
  },{
    $api: () => create_customer,
    valueKey: 'result.sources.0.id',
    pasteKey: 'data.source',
    getTitle: () => '👤 💳 source '+(create_customer.result?.sources?.length && create_customer.result.sources[0].object),
  },{
    $api: () => customer_get,
    valueKey: 'result.id',
    pasteKey: 'data.customer',
    title: '👤 GET Customer',
  },{
    $api: () => source_get,
    title: 'source GET customer',
    valueKey: 'result.customer',
    pasteKey: 'data.customer',
  }]
}

const verify_micro_deposits: ISimpleRouteEditor = {
  title: '🪙 🪙 Verify ACH micro deposits',
  warn: '⚠️ Bank account token must be associated with customer',
  pastes: [{
    $api: ()=> bank,
    valueKey: 'result.bank_account.id',
    pasteKey: 'request.params.bank_token',
    title: 'bank token',
  },{
    $api: () => create_customer,
    getTitle: () => 'customer ' + create_customer.result?.id,
    pasteKey: 'request.params.customer',
    valueKey: 'result.id',
  }],
  request:{
    method: 'POST',
    path: 'customers/${customer}/sources/${bank_token}/verify'
  },
  data: {
    amounts:[32, 45],
     // metadata: sample.metadata // not available here
  },
}

export const account_get: ISimpleRouteEditor = {
  title: 'GET Account',
  description: 'Get details of Stripe account being used',
  request:{
    method: 'GET',
    path: 'account'
  }
}

const application_fees_get: ISimpleRouteEditor = {
  title: '🤌 GET Application Fees',
  description: 'Get details of Stripe account being used',
  request:{
    method: 'GET',
    path: 'application_fees'
  }
}

interface ApiMenu {
  [name: string]: SmartRouteEditor
}

/** main */
export const stripeUrlArray = [
  application_fees_get,
  balance_get,
  account_get,

  verify_micro_deposits,

  payintent_retrieve,
  payintent_cancel,

  transfer_create,
]

export const urlBased = {
  source_get,
  charge,
  create_source,
  source_update,

  get_paymethods,
  payment_method_get,
  payment_method_update,

  payintent_create,
}

export function getApis (): ApiMenu {
  const menu = {
    confirm_pay_intent,
    bank, card,

    payintent_create,
    testHeader,

    plaid_createPublicToken,
    // ...plaidServerSide,
  }

  return simpleMenuToSmart(menu)
}

export default getApis
