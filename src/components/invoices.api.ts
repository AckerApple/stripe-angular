import { ApiGroup, ISimpleRouteEditor } from "./typings"
import { accounts_list, accounts_retrieve } from "./accounts.api"
import { card, source_get } from "./sources.api"
import { payment_method_get } from "./payment_methods.api"
import { customer_create, customer_attach_method, customer_get, customer_get_payment_methods, customer_get_source, customer_get_sources, customer_list_all } from "./customers.api"
import { refunds_list, refunds_retrieve, refund_create } from "./refunds.api"

export const invoice_item_create: ISimpleRouteEditor = {
  title: '🆕 Create Invoice Item',
  description: 'Creates a Invoice Item object',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/invoiceitems'
  }],
  favKeys: [{
    valueKey: 'result.id',
  }],
  request: {
    method: 'POST',
    path: 'invoiceitems',
  },
  data: {
    customer: '',
    price: ''
  },
  examples: [],
  pastes: [{
    $api: () => customer_list_all,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.customer'
  },{
    $api: () => customer_create,
    valueKey: 'result.id',
    pasteKey: 'data.customer'
  },{
    $api: () => customer_get,
    valueKey: 'data.id',
    pasteKey: 'data.customer',
  }]
}

export const invoice_create: ISimpleRouteEditor = {
  title: '🆕 Create Invoice',
  description: 'Creates a Invoice object',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/invoices'
  }],
  favKeys: [{
    valueKey: 'result.id',
  }],
  request: {
    method: 'POST',
    path: 'invoices'
  },
  data: {
    customer: '',
    description: 'stripe-angular test tool',
    metadata: {},
  },
  examples: [],
  pastes: [{
    $api: () => customer_list_all,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.customer',
    pastes: [{
      pasteKey: 'data.default_payment_method',
      valueKey: 'result.data.0.default_source',
      valueMatches: [{expression: '^(?!ba_)'}]
    },{
      pasteKey: 'data.default_source',
      valueKey: 'result.data.0.default_source',
      valueMatches: [{expression: '^ba_'}],
      pastes: [{
        pasteKey: 'data.payment_method_types',
        value: ['ach_debit', 'card']
      }]
    }]
  },{
    $api: () => customer_create,
    valueKey: 'result.id',
    pasteKey: 'data.customer'
  },{
    $api: () => customer_get,
    valueKey: 'data.id',
    pasteKey: 'data.customer',
  },{
    $api: () => card,
    valueKey: 'result.payment_method.id',
    pasteKey: 'data.default_payment_method',
  },{
    $api: () => card,
    valueKey: 'result.source.id',
    pasteKey: 'data.default_source',
  },{
    $api: () => card,
    valueKey: 'result.token.card.id',
    pasteKey: 'data.default_payment_method',
  },{
    $api: () => payment_method_get,
    title: 'pay method GET 1️⃣',
    valueKey: 'result.id',
    pasteKey: 'data.default_payment_method',
  },{
    $api: () => source_get,
    title: 'source GET 1️⃣',
    valueKey: 'result.id',
    pasteKey: 'data.default_payment_method',
  },{
    $api: () => customer_get_payment_methods,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.default_payment_method',
    pastes: [{
      valueKey: 'result.data.0.customer',
      pasteKey: 'data.customer'
    }]
  },{
    $api: () => customer_get_sources,
    valueKey: 'result.data.0.customer',
    pasteKey: 'data.customer',
    pastes: [{
      valueKey: 'result.data.0.id',
      pasteKey: 'data.default_payment_method',
      valueMatches: [{expression: '^(?!ba_)'}] // do NOT paste for banks
    },{
      valueKey: 'result.data.0.id',
      pasteKey: 'data.source',
      valueMatches: [{expression: '^ba_'}] // only paste for banks
    }]
  },{
    $api: () => customer_get_source,
    valueKey: 'result.customer',
    pasteKey: 'data.customer',
    pastes: [{
      valueKey: 'result.id',
      pasteKey: 'data.default_payment_method',
      valueMatches: [{expression: '^(?!ba_)'}] // do NOT paste for banks
    },{
      valueKey: 'result.id',
      pasteKey: 'data.default_source',
      valueMatches: [{expression: '^ba_'}] // only paste for banks
    }]
  },{
    $api: () => payment_method_get,
    title:'pay method customer',
    valueKey: 'result.customer',
    pasteKey: 'data.customer',
  }, {
    $api: () => invoice_retrieve,
    valueKey: 'result',
    pasteKey: 'data',
    removeKeys: ['id', 'object'],
    removeValues: [null]
  }, {
    $api: () => customer_attach_method,
    valueKey: 'result.id',
    pasteKey: 'data.default_payment_method',
    pastes: [{
      valueKey: 'result.customer',
      pasteKey: 'data.customer',
    }]
  }]
}

const invoice_void: ISimpleRouteEditor = {
  title: '🚫 Void Invoice',
  link: 'https://stripe.com/docs/api/invoices/void',
  request: {
    method: 'POST',
    path: 'invoices/:id/void'
  },
  data: {
  },
  pastes:[{
    $api: () => invoice_create,
    valueKey: 'result.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => invoice_retrieve,
    valueKey: 'result.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => invoice_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id'
  }]
}

export const invoice_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ Retrieve Invoice by id',
  link: 'https://stripe.com/docs/api/invoices/retrieve',
  request: {
    method: 'GET',
    path: 'invoices/:id'
  },
  pastes: [{
    $api: () => invoice_create,
    title: '🆕 Created Invoice',
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  }, {
    $api: () => invoice_list,
    pasteKey: 'request.params.id',
    valueKey: 'result.data.0.id'
  },{
    $api: () => refunds_list,
    valueKey: 'result.data.0.payment_intent',
    pasteKey: 'request.params.id'
  },{
    $api: () => refunds_retrieve,
    valueKey: 'result.payment_intent',
    pasteKey: 'request.params.id'
  }, {
    $api: () => refund_create,
    valueKey: 'result.payment_intent',
    pasteKey: 'request.params.id'
  }]
}

export const invoice_update: ISimpleRouteEditor = {
  title: '⬆️ Update Invoice by id',
  link: 'https://stripe.com/docs/api/invoices/update',
  request: {
    method: 'POST',
    path: 'invoices/:id'
  },
  data: {
    metadata: {order_id: '6735'}
  },
  pastes: [{
    $api: () => invoice_retrieve,
    title: '1️⃣ Invoice retrieve by id',
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  },{
    $api: () => invoice_list,
    title: '🧾 Invoice list 1️⃣',
    pasteKey: 'request.params.id',
    valueKey: 'result.data.0.id',
  },{
    $api: () => invoice_create,
    title: '🆕 Created Invoice',
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  },{
    $api: () => accounts_list,
    title: 'Accounts list 1️⃣',
    pasteKey: 'data.transfer_data.destination',
    valueKey: 'result.data.0.id'
  },{
    $api: () => accounts_retrieve,
    title: 'Accounts retrieve by id',
    pasteKey: 'data.transfer_data.destination',
    valueKey: 'result.id'
  },{
    $api: () => customer_list_all,
    title: '🧾 customer list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'data.customer'
  },{
    $api: () => customer_create,
    valueKey: 'result.id',
    pasteKey: 'data.customer'
  },{
    $api: () => customer_get,
    valueKey: 'data.id',
    pasteKey: 'data.customer',
  },{
    $api: () => customer_get_payment_methods,
    title: '🧾 💳 Customer GET payment methods',
    valueKey: 'result.data.0.id',
    pasteKey: 'data.payment_method',
  },{
    $api: () => card,
    valueKey: 'result.payment_method.id',
    pasteKey: 'data.payment_method',
  },{
    $api: () => card,
    valueKey: 'result.source.id',
    pasteKey: 'data.payment_method',
  },{
    $api: () => card,
    valueKey: 'result.token.card.id',
    pasteKey: 'data.payment_method',
  },{
    $api: () => payment_method_get,
    valueKey: 'result.id',
    pasteKey: 'data.payment_method',
  },{
    $api: () => payment_method_get,
    title:'pay method customer',
    valueKey: 'result.customer',
    pasteKey: 'data.customer',
  },{
    title: 'accounts list 1️⃣',
    $api: () => accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.headers.Stripe-Account'
  },{
    title: 'accounts GET',
    $api: () => accounts_retrieve,
    valueKey: 'result.id',
    pasteKey: 'request.headers.Stripe-Account'
  }]
}

export const invoice_search: ISimpleRouteEditor = {
  title: '🔎 search payment intents',
  link: 'https://stripe.com/docs/api/invoices/search',
  request: {
    method: 'GET',
    path: 'invoices/search',
  },
  pastes: [],
  data: {
    limit: 3, query: "metadata['key']:'value'"
  }
}

export const invoice_list: ISimpleRouteEditor = {
  title: '🧾 List all Invoices',
  link: 'https://stripe.com/docs/api/invoices/retrieve',
  request: {
    method: 'GET',
    path: 'invoices'
  },
  data: {
    limit: 3, // "created[lte]": Date.now() - 1000 * 60 * 5 // greater than last five minutes
  },
  pastes: [{
    $api: () => payment_method_get,
    title:'pay method customer',
    valueKey: 'result.customer',
    pasteKey: 'data.customer',
  },{
    $api: () => customer_create,
    valueKey: 'result.id',
    pasteKey: 'data.customer'
  },{
    $api: () => customer_get,
    valueKey: 'data.id',
    pasteKey: 'data.customer',
  },{
    $api: () => customer_list_all,
    title: 'Customer list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'data.customer',
  }]
}

export const apis = [
  invoice_create,
  invoice_retrieve,
  invoice_search,
  invoice_list,
  invoice_update,
  invoice_void,
]

export const invoices: ApiGroup = {
  icon: '✍️',
  title: 'Invoices', apis,
  description: 'A Invoice guides you through the process of collecting a payment from your customer.',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/invoices'
  }],
}