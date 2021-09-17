import { EventEmitter } from "@angular/core"
import {
  ISimpleRouteEditor, sample, SmartRouteEditor,
} from "./app.component.utils"

import { plaid_createPublicToken, serverSide as plaidServerSide } from './plaid.apis'

export interface BankData {
  data: stripe.BankAccountTokenOptions,
  verify: {amount1?: number, amount2?: number},
  verifyResponse?: any,
  token?: any
}

const balance_get: ISimpleRouteEditor = {
  title: '💵 Balance',
  link: 'https://stripe.com/docs/api/balance/balance_retrieve',
  description: 'Get Stripe owner account balance',
  request: {
    method: 'GET',
    path: 'balance'
  },
  data: {
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
const create_customer: ISimpleRouteEditor = {
  title: '👤 Create Customer',
  link: 'https://stripe.com/docs/api/customers',
  results: {
    favKeys: [{name: 'id'}]
  },
  request: {
    method: 'POST',
    path: 'customers'
  },
  data: {
    description: "some new customer",
    ...sample.owner,
    metadata: sample.metadata
  }
}

const delete_customer: ISimpleRouteEditor = {
  title: '❌ 👤 Delete Customer',
  link: 'https://stripe.com/docs/api/customers/delete',
  request: {
    method: 'DELETE',
    path: 'customers/${id}'
  },
  data: {
    id: '',
  },
  pastes: [{
    api: create_customer,
    getTitle: () => 'customer ' + create_customer.result?.id,
    pasteKey: 'id',
    valueKey: 'result.id',
  }]
}

const create_source: ISimpleRouteEditor = {
  title: '💳 Create source',
  link: 'https://stripe.com/docs/sources/ach-credit-transfer',
  hint: 'Typically used for credit-transfer/wires',
  results: {
    favKeys: [{name: 'id'}],
  },
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

const customer_list_all: ISimpleRouteEditor = {
  title: '🧾 👤 List all customers',
  link: 'https://stripe.com/docs/api/customers/list',
  request: {
    method: 'GET',
    path: 'customers',
  },
  pastes: [{
    api: create_customer,
    valueKey: 'result.id',
    pasteKey: 'starting_after',
    getTitle: () => 'created 👤 ' + create_customer.result?.id
  }],
  data: {
    limit: 3, "created[gte]": Date.now() - 1000 * 60 * 5 // greater than last five minutes
  }
}

const delete_source: ISimpleRouteEditor = {
  title: '❌ 💳 delete source card',
  link: 'https://stripe.com/docs/api/cards/delete',
  request: {
    method: 'DELETE',
    path: 'customers/${customer}/sources/${source}'
  },
  data: {
    customer: '',
    source: '',
  },
  pastes: [{
    api: create_customer,
    getTitle: () => 'customer ' + create_customer.result?.id,
    pasteKey: 'customer',
    valueKey: 'result.id',
  }, {
    api: create_source,
    getTitle: () => 'source ' + create_source.result?.id,
    pasteKey: 'source',
    valueKey: 'result.id',
  }]
}

const customer_update: ISimpleRouteEditor = {
  title: '👤 UPDATE Customer',
  links: [{title: 'docs', url: 'https://stripe.com/docs/api/customers/update'}],
  request: {
    method: 'POST',
    path: 'customers/${id}'
  },
  data: {
    id: "",
    metadata: sample.metadata
  }
}

const customer_get: ISimpleRouteEditor = {
  title: '👤 GET Customer',
  link: 'https://stripe.com/docs/api/customers/retrieve',
  request: {
    method: 'GET',
    path: 'customers/${id}'
  },
  data: {
    id: ""
  }
}

const get_paymethods: ISimpleRouteEditor = {
  title: '💳 GET Payment Methods',
  link: 'https://stripe.com/docs/api/payment_methods/list',
  request: {
    method: 'GET',
    path: 'payment_methods'
  },
  data: {
    customer: "", type: "card"
  }
}

const customer_attach_method: ISimpleRouteEditor = {
  title: '👤 ➡️ 💳 Customer attach pay method',
  results: {
    favKeys: [{name: 'id'}]
  },
  request: {
    method: 'POST',
    path: 'payment_methods/${id}/attach'
  },
  data: {
    id: '',
    customer: ''
  } // not used currently
}

const customer_attach_source: ISimpleRouteEditor = {
  title: '👤 ➡️ 💳 Customer attach pay source',
  link: 'https://stripe.com/docs/sources/customers#attaching-a-source-to-a-new-customer-object',
  results: {
    favKeys: [{name: 'id'}]
  },
  request: {
    method: 'POST',
    path: 'customers/${id}/sources'
  },
  data: {
    id: '',
    source: ''
  } // not used currently
}

const customer_detach_method: ISimpleRouteEditor = {
  request: {
    method: 'POST',
    path: 'payment_methods/${id}/detach'
  },
  data: {} // not used currently
}

const customer_get_sources: ISimpleRouteEditor = {
  title: '👤 💳 GET Customer Sources',
  link: 'https://stripe.com/docs/api/cards/list',
  request: {
    method: 'GET',
    path: 'customers/${id}/sources'
  },
  data: {
    id: ""
  }
}

const source_get: ISimpleRouteEditor = {
  title: '💳 GET Source',
  link: 'https://stripe.com/docs/api/sources/retrieve',
  request: {
    method: 'GET',
    path: 'sources/${id}'
  },
  data: {
    id: ""
  }
}

const source_update: ISimpleRouteEditor = {
  title: '⬆️ 💳 UPDATE Source',
  link: 'https://stripe.com/docs/api/sources/update',
  request: {
    method: 'POST',
    path: 'sources/${id}'
  },
  data: {
    id: "",
    metadata: {},
    owner: {},
  }
}

const payment_method_get: ISimpleRouteEditor = {
  title: '💳 GET Payment Method',
  link: 'https://stripe.com/docs/api/payment_methods/retrieve',
  request: {
    method: 'GET',
    path: 'payment_methods/${id}'
  },
  data: {
    id: ""
  }
}

const payment_method_update: ISimpleRouteEditor = {
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
    id: "",
    billing_details: {},
    card: {
      exp_month: '03',
      exp_year: (new Date().getFullYear() + 1).toString(),
    },
    metadata: {},
  }
}

const payintent_create: ISimpleRouteEditor = {
  title: '💸 Create Pay Intent',
  link: 'https://stripe.com/docs/api/payment_intents',
  results: {
    favKeys: [{name: 'id'}]
  },
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
  }
}

const payintent_retrieve: ISimpleRouteEditor = {
  title: '💸 Retrieve Pay Intent',
  link: 'https://stripe.com/docs/api/payment_intents/retrieve',
  request: {
    method: 'GET',
    path: 'payment_intents/${id}'
  },
  data: {
    id: '',
  },
  pastes: [{
    api: payintent_create,
    getTitle: () => payintent_create.result.id,
    pasteKey: 'id',
    valueKey: 'result.id',
  }]
}

const confirm_pay_intent: ISimpleRouteEditor = {
  title: '🤝 Confirm Pay Intent',
  link: 'https://stripe.com/docs/payments/3d-secure#confirm-payment-intent',
  description: 'If a pay intent requires verification, use the form below',
  results: {
    favKeys: [{name: 'id'}]
  },
  request: {
    method: 'POST',
    path: 'confirm'
  },
  data: {
    client_secret: "",
    return_url: window.location.href
  },
  pastes: [{
    api: payintent_retrieve,
    getTitle: () => 'pay intent client_secret',
    pasteKey: 'client_secret',
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

const charge: ISimpleRouteEditor = {
  title: '💵 Create Charge',
  link: 'https://stripe.com/docs/api/charges',
  results: {
    favKeys: [{name: 'id'}]
  },
  request: {
    method: 'POST',
    path: 'charges'
  },
  data: {
    amount: 999,
    currency: 'usd',
    metadata: sample.metadata
  }
}

const verify_micro_deposits: ISimpleRouteEditor = {
  title: '🪙 🪙 Verify ACH micro deposits',
  warn: '⚠️ Bank account token must be associated with customer',
  pastes: [{
    api: bank,
    valueKey: 'result.bank_account.id',
    pasteKey: 'bank_token',
    getTitle: () => 'bank token',
  },{
    api: create_customer,
    getTitle: () => 'customer ' + create_customer.result?.id,
    pasteKey: 'customer',
    valueKey: 'result.id',
  }],
  request:{
    method: 'POST',
    path: 'customers/${customer}/sources/${bank_token}/verify'
  },
  data: {
    amounts:[32, 45],
    metadata: sample.metadata
  },
}

const testHeader: ISimpleRouteEditor = {
  data: {}
}

interface ApiMenu {
  [name: string]: SmartRouteEditor
}

export const stripeUrlArray = [
  delete_customer,
  customer_list_all,

  delete_source,

  verify_micro_deposits,
  balance_get,

  payintent_retrieve,
  payintent_cancel,
]

export const urlBased = {
  source_get,
  charge,
  create_source,
  source_update,

  get_paymethods,
  payment_method_get,
  payment_method_update,

  customer_attach_method,
  customer_attach_source,
  customer_get_sources,
  create_customer,
  customer_get,
  customer_update,

  payintent_create,
}

export function getApis (): ApiMenu {
  const menu = {
    confirm_pay_intent,

    // server sides
    bank,

    // customer apis
    customer_detach_method,

    payintent_create,
    testHeader,

    plaid_createPublicToken,
    // ...plaidServerSide,
  }

  return simpleMenuToSmart(menu)
}

export default getApis

export function simpleMenuToSmart(
  menu: {[name: string]: ISimpleRouteEditor}
): {[name: string]: SmartRouteEditor} {
  return Object.entries(menu).reduce((end, [key, value]) => {
    end[ key ] = simpleRouteToSmart(value)
    return end
  }, menu as any)
}

export function simpleRouteToSmart(route: ISimpleRouteEditor): SmartRouteEditor {
  const routeRef = route as SmartRouteEditor
  routeRef.$send = new EventEmitter()
  routeRef.load = 0
  return routeRef
  /*return {
    ...route,
    $send: new EventEmitter(),
    load: 0,
  }*/
}