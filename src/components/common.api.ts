import { ISimpleRouteEditor, sample } from "./app.component.utils"
import { accounts_get } from "./accounts.api"
import { card, create_source, payment_method_get, source_get } from "./cards.api"
import { create_customer, customer_attach_source, customer_get } from "./customers.api"

export const balance_get: ISimpleRouteEditor = {
  title: '💵 Balance',
  link: 'https://stripe.com/docs/api/balance/balance_retrieve',
  description: 'Retrieves the current account balance, based on the authentication that was used to make the request',
  request: {
    method: 'GET',
    path: 'balance',
    headers: {
      'Stripe-Account': ''
    },
    removeHeaderValues: ['']
  },
  pastes:[{
    $api: () => accounts_get,
    title: 'Accounts GET 1️⃣ header',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.headers.Stripe-Account',
  }]
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

export const payintent_create: ISimpleRouteEditor = {
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

export const payintent_retrieve: ISimpleRouteEditor = {
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

export const prices_get: ISimpleRouteEditor = {
  title: '🪜 GET Prices',
  link: 'https://stripe.com/docs/api/prices',
  description: 'Prices define the unit cost, currency, and (optional) billing cycle for both recurring and one-time purchases of products',
  request: {
    method: 'GET',
    path: 'prices'
  }
}

export const disputes_get: ISimpleRouteEditor = {
  title: '🙅 List all disputes',
  link: 'https://stripe.com/docs/api/disputes/list',
  description: 'Returns a list of your disputes.',
  request: {
    method: 'GET',
    path: 'disputes'
  }
}

export const account_get: ISimpleRouteEditor = {
  title: 'GET Account',
  description: 'Get details of Stripe account being used',
  request:{
    method: 'GET',
    path: 'account'
  },
  pastes:[{
    $api: () => accounts_get,
    title: 'Accounts GET 1️⃣ header',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.headers.Stripe-Account',
  }]
}

const application_fees_get: ISimpleRouteEditor = {
  title: '🤌 GET Application Fees',
  description: 'Get details of Stripe account being used',
  request:{
    method: 'GET',
    path: 'application_fees'
  }
}

export const apis = [
  account_get,
  balance_get,
  prices_get,
  disputes_get,
  application_fees_get,

  payintent_create,
  payintent_retrieve,
  payintent_cancel,
]