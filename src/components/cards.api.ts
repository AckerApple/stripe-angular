// import { customerApis } from './getApis.function'
import { create_customer, customer_get_sources } from './customers.api'
import { ISimpleRouteEditor } from "./app.component.utils"

export const cardRemoveKeys = [
  'wallet', 'checks', 'three_d_secure_usage', 'fingerprint', 'last4', 'generated_from',
  'country', 'brand', 'address_line1_check', 'address_zip_check', 'cvc_check',
  'funding', 'three_d_secure', 'name', 'tokenization_method', 'dynamic_last4',
  'networks.available', 'networks.preferred',
]

export const cleanPayMethodKeys = [
  ...cardRemoveKeys,
  'object', 'checks', 'available', 'created', 'livemode', 'type',
  'customer', // you cannot associate customer during pay method update
]

const ownerDataKeys = ['verified_address', 'verified_email', 'verified_name', 'verified_phone']
export const cleanSourceRemoveKeys = [
  ...cardRemoveKeys.map(name => 'card.' + name), ...ownerDataKeys.map(name => 'owner.' + name),
  'id','amount',
  'object', 'client_secret', 'created', 'flow', 'livemode', 'address', 'status',
  'type', 'usage', 'currency', 'statement_descriptor',
  'customer' // you cannot associate customer during source update
]

export const card: ISimpleRouteEditor = {
  title: '💳 Card Element',
  result: {}, // where source, payment_method, and token will go
}

export const create_source: ISimpleRouteEditor = {
  title: '🆕 💳 Create source',
  link: 'https://stripe.com/docs/sources/ach-credit-transfer',
  hint: 'Typically used for credit-transfer/wires',
  favKeys: [{valueKey: 'result.id'}],
  request: {
    method: 'POST',
    path: 'sources'
  },
  data: {
    type: "ach_credit_transfer",
    currency: "usd",
    owner: {
      email: "jenny.rosen@example.com"
    },
  }
}

export const get_paymethods: ISimpleRouteEditor = {
  title: '💳 GET Payment Methods',
  link: 'https://stripe.com/docs/api/payment_methods/list',
  request: {
    method: 'GET',
    path: 'payment_methods'
  },
  data: {
    type: "card"
  },
  pastes: [{
    $api: () => create_customer,
    getTitle: () => 'customer ' + create_customer.result.id,
    valueKey: 'result.id',
    pasteKey: 'data.customer',
  }]
}

export const source_get: ISimpleRouteEditor = {
  title: '1️⃣ 💳 GET Source',
  link: 'https://stripe.com/docs/api/sources/retrieve',
  messages: [{
    valueExpression: 'ba_',
    valueKey: 'request.params.id',
    message: '⚠️ It appears you are using a bank source which is NOT truly a source. Fetch bank sources using GET /customers/:id/sources',
  },{
    valueExpression: 'btok_',
    valueKey: 'request.params.id',
    message: '⚠️ It appears you are using a bank token which is NOT a source',
  }],
  request: {
    method: 'GET',
    path: 'sources/${id}',
  },
  pastes: [{
    $api: () => card,
    getTitle: () => 'use source '+card.result.source?.card.brand+' '+card.result.source?.card.last4,
    valueKey: 'result.source.id',
    pasteKey: 'request.params.id',
  }, {
    $api: () => create_source,
    getTitle: () => 'source '+ create_source.result.type,
    valueKey: 'create_source.result.id',
    pasteKey: 'request.params.id',
  },{
    $api: () => customer_get_sources,
    title: 'GET customer.sources[0].id',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.source'
  }],
}

export const source_update: ISimpleRouteEditor = {
  title: '⬆️ 💳 UPDATE Source',
  link: 'https://stripe.com/docs/api/sources/update',
  request: {
    method: 'POST',
    path: 'sources/${id}'
  },
  data: {
    metadata: {},
    owner: {},
  },
  pastes:[{
    $api: () => source_get,
    title: 'GET source',
    valueKey: 'result',
    pasteKey: 'data',
    removeKeys: cleanSourceRemoveKeys,
    removeValues: [null]
  },{
    $api: () => source_get,
    title: 'GET source id',
    valueKey: 'result.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => card,
    title: 'stripejs source id',
    valueKey: 'result.source.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => card,
    title: 'stripejs source element',
    valueKey: 'result.source.id',
    pasteValueKey: 'result.source',
    pasteKey: 'data',
    removeKeys: cleanSourceRemoveKeys,
    removeValues: [null]
  }]
}

export const payment_method_get: ISimpleRouteEditor = {
  title: '1️⃣ 💳 GET Payment Method',
  link: 'https://stripe.com/docs/api/payment_methods/retrieve',
  request: {
    method: 'GET',
    path: 'payment_methods/${id}'
  },
  pastes: [{
    $api: () => card,
    getTitle: () => 'pm '+card.result.payment_method?.card?.brand+' '+card.result.payment_method?.card?.last4,
    valueKey: 'result.payment_method.id',
    pasteKey: 'request.params.id',
  }]
}

export const payment_method_update: ISimpleRouteEditor = {
  title: '⬆️ 💳 UPDATE Payment Method',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/payment_methods/update',
  },{
    title: 'update pay details',
    url: 'https://stripe.com/docs/payments/checkout/subscriptions/update-payment-details',
  }],
  request: {
    method: 'POST',
    path: 'payment_methods/${id}'
  },
  data: {
    billing_details: {},
    card: {
      exp_month: '03',
      exp_year: (new Date().getFullYear() + 1).toString(),
    },
    metadata: {},
  },
  pastes:[{
    $api: () => card,
    getTitle: () => 'pay method type ' + card.result.payment_method.type,
    valueKey: 'result.payment_method.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => payment_method_get,
    getTitle: () => 'pay method type ' + payment_method_get.result.type,
    valueKey: 'result.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => payment_method_get,
    getTitle: () => 'pay method type ' + payment_method_get.result.type,
    valueKey: 'result',
    pasteKey: 'data',
    removeKeys: cleanPayMethodKeys,
  }]
}

export const apis = [
  // card,
  create_source, source_get, source_update,
  get_paymethods, payment_method_get, payment_method_update,
]
