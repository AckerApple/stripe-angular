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

const confirm_pay_intent: ISimpleRouteEditor = {
  title: '🤝 Confirm Pay Intent',
  link: 'https://stripe.com/docs/payments/3d-secure#confirm-payment-intent',
  description: 'If a pay intent requires verification, use the form below',
  request: {
    method: 'POST',
    path: 'confirm'
  },
  data: {
    client_secret: "",
    return_url: window.location.href
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
const customer: ISimpleRouteEditor = {
  title: '👤 Create Customer',
  link: 'https://stripe.com/docs/api/customers',
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

const customer_update: ISimpleRouteEditor = {
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
  request: {
    method: 'GET',
    path: 'customers/${id}'
  },
  data: {
    id: ""
  }
}

const get_paymethods: ISimpleRouteEditor = {
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
  request: {
    method: 'GET',
    path: 'customers/${id}/sources'
  },
  data: {
    id: ""
  }
}

const source_get: ISimpleRouteEditor = {
  request: {
    method: 'GET',
    path: 'sources/${id}'
  },
  data: {
    id: ""
  }
}

const source_update: ISimpleRouteEditor = {
  request: {
    method: 'POST',
    path: 'sources/${id}'
  },
  data: {
    id: ""
  }
}

const payment_method_get: ISimpleRouteEditor = {
  request: {
    method: 'GET',
    path: 'payment_methods'
  },
  data: {
    id: ""
  }
}

const payment_method_update: ISimpleRouteEditor = {
  request: {
    method: 'POST',
    path: 'payment_methods/${id}'
  },
  data: {
    id: ""
  }
}

const payintent: ISimpleRouteEditor = {
  request: {
    method: 'POST',
    path: 'payment_intents'
  },
  data: {
    amount: 1099,
    confirm: 'true',
    currency: 'usd',
    setup_future_usage: 'off_session',
    metadata: sample.metadata
  }
}

const payintent_retrieve: ISimpleRouteEditor = {
  request: {
    method: 'GET',
    path: 'payment_intents/${id}'
  },
  data: {
    id: '',
  }
}

const payintent_cancel: ISimpleRouteEditor = {
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
  request: {
    method: 'POST',
    path: 'charges'
  },
  data: {
    amount: 1099,
    currency: 'usd',
    metadata: sample.metadata
  }
}

const testHeader: ISimpleRouteEditor = {
  data: {}
}

interface ApiMenu {
  [name: string]: SmartRouteEditor
}

export function getApis (): ApiMenu {
  const menu = {
    confirm_pay_intent,

    // server sides
    bank,
    get_paymethods,

    // customer apis
    customer,
    customer_update,
    customer_get,
    customer_attach_method,
    customer_detach_method,
    customer_attach_source,
    customer_get_sources,
    source_get,
    source_update,
    payment_method_get,
    payment_method_update,
    payintent,
    payintent_retrieve,
    payintent_cancel,
    charge,
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
  }, {})
}

export function simpleRouteToSmart(route: ISimpleRouteEditor): SmartRouteEditor {
  return {
    ...route,
    $send: new EventEmitter(),
    load: 0,
  }
}