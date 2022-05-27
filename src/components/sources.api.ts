// import { customerApis } from './getApis.function'
import { customer_get_payment_methods, customer_get_sources } from './customers.api'
import { ApiGroup, ISimpleRouteEditor } from "./typings"

export const cardRemoveKeys = [
  'wallet', 'checks', 'three_d_secure_usage', 'fingerprint', 'last4', 'generated_from',
  'country', 'brand', 'address_line1_check', 'address_zip_check', 'cvc_check',
  'funding', 'three_d_secure', 'name', 'tokenization_method', 'dynamic_last4',
  'networks.available', 'networks.preferred',
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
  // result: {}, // where source, payment_method, and token will go
}

export const create_source: ISimpleRouteEditor = {
  title: '🆕 💳 Create source',
  links: [{
    title: '📕 api docs',
    url: 'https://stripe.com/docs/api/sources/create'
  }, {
    title: 'ach credit transfer',
    url: 'https://stripe.com/docs/sources/ach-credit-transfer'
  }, {
    title: 'credit transfers',
    url: 'https://stripe.com/docs/payments/sources/credit-transfers'
  }, {
    url: 'https://stripe.com/docs/sources/ach-credit-transfer#testing-ach-credit-transfer-payments',
    title: 'set amount to send'
  }],
  // hint: '',
  description: 'Typically used for creating credit-transfer/wire account details',
  favKeys: [{valueKey: 'result.id'}],
  request: {
    method: 'POST',
    path: 'sources'
  },
  data: {
    type: "ach_credit_transfer",
    currency: "usd",
    owner: {
      email: "amount_4242@example.com"
    },
    metadata: {},
  }
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
    path: 'sources/:id',
  },
  pastes: [{
    $api: () => card,
    valueKey: 'result.source.id',
    pasteKey: 'request.params.id',
  }, {
    $api: () => create_source,
    valueKey: 'result.id',
    pasteKey: 'request.params.id',
  }, {
    $api: () => source_transactions,
    valueKey: 'request.params.id',
    pasteKey: 'request.params.id',
  }, {
    $api: () => customer_get_sources,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.source'
  }, {
    $api: () => customer_get_payment_methods,
    valueKey: 'result.data.0.id',
    valueMatches: [{
      expression: 'src_'
    }]
  }],
}

export const source_update: ISimpleRouteEditor = {
  title: '⬆️ 💳 UPDATE Source',
  links: [{
    url: 'https://stripe.com/docs/sources/ach-credit-transfer#testing-ach-credit-transfer-payments',
    title: 'test sending more money'
  }, {
    url: 'https://stripe.com/docs/api/sources/update',
    title: 'api docs'
  }],
  request: {
    method: 'POST',
    path: 'sources/:id'
  },
  data: {
    metadata: {},
    owner: {
      email: 'amount_3000@example.com'
    },
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

const source_transactions: ISimpleRouteEditor = {
  title: '🧾 ⚡️ List source transactions',
  description: 'See the transactions for an ach-credit-transfer/wire account',
  links: [{
    title: 'retrieving transaction history',
    url: 'https://stripe.com/docs/sources/ach-credit-transfer#retrieving-transaction-history'
  }],
  request: {
    method: 'GET',
    path: 'sources/:id/source_transactions'
  },
  data: {
    limit: 3,
  },
  pastes:[{
    $api: () => source_get,
    valueKey: 'result.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => create_source,
    valueKey: 'result.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => card,
    valueKey: 'result.source.id',
    pasteKey: 'request.params.id'
  }]
}

const sources_list: ISimpleRouteEditor = {
  description: 'Only way to list sources is scoped by customer',
  title: '🧾 💳 ➡️ 👤 List sources by customer',
  $api: ()=> customer_get_sources
}

export const apis: ISimpleRouteEditor[] = [
  // card,
  create_source, source_get, source_update,
  sources_list, source_transactions,
]

export const sourcesApi: ApiGroup = {
  title: 'Sources', apis: apis,
  icon: '💳 🏦',
  links: [{
    title: '📕 api docs',
    url: 'https://stripe.com/docs/api/sources'
  }],
  description: 'Cards, banks, and credit-transfer/wires',
}