import { sample } from "./app.component.utils"
import { ApiGroup, ISimpleRouteEditor } from "./typings"
import { accounts_list, accounts_retrieve } from "./accounts.api"
import { card, create_source, source_get } from "./sources.api"
import { payment_method_get } from "./payment_methods.api"
import { customer_create, customer_attach_method, customer_get, customer_get_payment_methods, customer_get_source, customer_get_sources, customer_list_all } from "./customers.api"
import { refunds_list, refunds_retrieve, refund_create } from "./refunds.api"
import { bank } from "./banks.api"
import { collectBankAccountForSetup, collectBankAccountToken, collectFinancialConnectionsAccounts } from "./financial-connections.api"
import { setup_intent_create } from "./setup-intents.api"

export const payintent_create: ISimpleRouteEditor = {
  title: '🆕 Create Pay Intent',
  description: 'Creates a PaymentIntent object',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/payment_intents'
  },{
    url: 'https://stripe.com/docs/connect/direct-charges#collecting-fees',
    title: 'collecting fees'
  },{
    url: 'https://stripe.com/docs/api/payment_intents/create#create_payment_intent-off_session',
    title: 'off_session'
  },{
    url: 'https://stripe.com/docs/payments/payment-intents#future-usage',
    title: 'setup_future_usage'
  }],
  favKeys: [{
    valueKey: 'result.id',
  },{
    valueKey: 'result.client_secret'
  },{
    type: 'link', valueKey: 'result.next_action.use_stripe_sdk.stripe_js', title: 'secure payment verify link'
  }],
  request: {
    method: 'POST',
    path: 'payment_intents',
    headers: {
      'Stripe-Account': ''
    },
    removeHeaderValues: ['']
  },
  data: {
    amount: 999,
    confirm: 'true',
    currency: 'usd',
    setup_future_usage: 'off_session',
    metadata: sample.metadata,
    statement_descriptor: 'stripe-angular data',
    transfer_group: 'TEST_ORDER',
    payment_method_types: ["ach_debit","us_bank_account","card"]
  },
  examples: [{
    title: 'Transfer to Stripe Account',
    data: {
      amount: 999,
      currency: 'usd',
      transfer_data: {
        amount: 850,
        destination: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
      },
      metadata: sample.metadata,
      statement_descriptor: 'stripe-angular with xfer',
      setup_future_usage: 'off_session',
    }
  },{
    title: 'application fee',
    data: {
      amount: 999,
      currency: 'usd',
      application_fee_amount: 100,
      transfer_data: {
        // amount: 850, // not allowed to use amount WITH application fee
        destination: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
      },
      metadata: sample.metadata,
      statement_descriptor: 'stripe-angular application_fee_amount',
      setup_future_usage: 'off_session',
    }
  },{
    title: 'Source ach_debit with transfer',
    data: {
      amount: 10000,
      confirm: "true",
      currency: "usd",
      metadata: {
        entity_id: "entity_id_abc_123",
        site_abb: "wal",
        env: "dev",
        order_id: "stripe-angular-testings"
      },
      transfer_group: "TEST_ORDER",
      source: "",
      customer: "",
      transfer_data: {
        amount: 7000,
        destination: "acct_1JkUxsS7GjacJ5J0"
      },
      payment_method_types: ["ach_debit"]
    }
  }],
  pastes: [{
    title: 'success test card',
    pasteKey: 'data.payment_method',
    value: 'pm_card_visa'
  },{
    title: 'will be disputed',
    pasteKey: 'data.payment_method',
    value: 'pm_card_createDispute'
  },{
    $api: () => create_source,
    pasteKey: 'data.source',
    valueKey: 'result.id'
  },{
    $api: () => accounts_retrieve,
    pasteKey: 'data.transfer_data.destination',
    valueKey: 'result.id'
  },{
    $api: () => customer_list_all,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.customer',
    pastes: [{
      pasteKey: 'data.payment_method',
      valueKey: 'result.data.0.default_source',
      valueMatches: [{expression: '^(?!ba_)'}]
    },{
      pasteKey: 'data.source',
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
    title: 'pay method GET 1️⃣',
    valueKey: 'result.id',
    pasteKey: 'data.payment_method',
  },{
    $api: () => source_get,
    title: 'source GET 1️⃣',
    valueKey: 'result.id',
    pasteKey: 'data.payment_method',
  },{
    $api: () => customer_get_payment_methods,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.payment_method',
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
      pasteKey: 'data.payment_method',
      valueMatches: [{expression: '^(?!ba_)'}] // do NOT paste for banks
    },{
      valueKey: 'result.data.0.id',
      pasteKey: 'data.source',
      valueMatches: [{expression: '^ba_'}] // only paste for banks
    },{
      pasteKey: 'data.payment_method_types',
      value: ["ach_debit"],
      valueMatches: [{
        expression: 'ba_', valueKey: 'result.data.0.id' // only paste for banks
      }],
    }]
  },{
    $api: () => customer_get_source,
    valueKey: 'result.customer',
    pasteKey: 'data.customer',
    pastes: [{
      valueKey: 'result.id',
      pasteKey: 'data.payment_method',
      valueMatches: [{expression: '^(?!ba_)'}] // do NOT paste for banks
    },{
      valueKey: 'result.id',
      pasteKey: 'data.source',
      valueMatches: [{expression: '^ba_'}] // only paste for banks
    },{
      pasteKey: 'data.payment_method_types',
      value: ["ach_debit"],
      valueMatches: [{
        expression: 'ba_', valueKey: 'result.id' // only paste for banks
      }],
    }]
  },{
    $api: () => payment_method_get,
    title:'pay method customer',
    valueKey: 'result.customer',
    pasteKey: 'data.customer',
  },{
    title: 'Create pay intent as another account',
    $api: () => accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.headers.Stripe-Account'
  },{
    $api: () => accounts_list,
    pasteKey: 'data.transfer_data.destination',
    valueKey: 'result.data.0.id'
  },{
    title: 'accounts GET',
    $api: () => accounts_retrieve,
    valueKey: 'result.id',
    pasteKey: 'request.headers.Stripe-Account'
  }, {
    $api: () => payintent_retrieve,
    valueKey: 'result',
    pasteKey: 'data',
    removeKeys: ['id', 'object', 'amount_capturable', 'amount_received', 'application', 'canceled_at', 'cancellation_reason', 'charges', 'client_secret', 'created', 'last_payment_error', 'livemode', 'next_action', 'review', 'status'],
    removeValues: [null]
  }, {
    $api: () => customer_attach_method,
    valueKey: 'result.id',
    pasteKey: 'data.payment_method',
    pastes: [{
      valueKey: 'result.customer',
      pasteKey: 'data.customer',
    }]
  },{
    title: 'ach_credit_transfer',
    pasteKey: 'data.payment_method_types',
    value: ["ach_credit_transfer"],
    afterRemoveKeys: ['data.setup_future_usage']
  },{
    title: 'ach_debit',
    pasteKey: 'data.payment_method_types',
    value: ["ach_debit"],
    afterRemoveKeys: ['data.setup_future_usage']
  },{
    $api: ()=> bank,
    valueKey: 'result.bank_account.id',
    pasteKey: 'request.params.bank_token',
    title: 'bank token',
    pastes: [{
      pasteKey: 'data.payment_method_types',
      value: ["ach_debit"],  
    }],
    removeKeys: ['setup_future_usage']
  },{
    $api: () => collectFinancialConnectionsAccounts,
    pasteKey: 'data.payment_method_data',
    value: {
      type: "us_bank_account",
      billing_details: {
        name: "billing_details_name"
      },
      us_bank_account:{
        account_holder_type: 'company'
      }
    },
    pastes:[{
      pasteKey: 'data.payment_method_types',
      value: ['us_bank_account']
    },{
      pasteKey: 'data.payment_method_data.us_bank_account.financial_connections_account',
      valueKey: 'result.financialConnectionsSession.accounts.0.id',
    },{
      pasteKey: 'data.currency',
      value: 'usd'
    },{
      pasteKey: 'data.setup_future_usage',
      value: undefined // cause it to be deleted
    },{
      pasteKey: 'data.mandate_data',
      value: {
        customer_acceptance: {
          accepted_at: 1647448692,
          type: "online",
          online: {
            ip_address: "71.183.194.54",
            user_agent: "Mozilla/5.0"
          }
        }
      }
    }]
  },{
    $api: () => collectBankAccountToken,
    pasteKey: 'data.payment_method_data.us_bank_account.financial_connections_account',
    valueKey: 'result.financialConnectionsSession.accounts.0.id',
    pastes:[{
      pasteKey: 'data.payment_method_types',
      value: ['us_bank_account']
    },{
      pasteKey: 'data.currency',
      value: 'usd'
    },{
      pasteKey: 'data.payment_method_data.type',
      value: 'us_bank_account'
    },{
      pasteKey: 'data.payment_method_data.billing_details.name',
      value: 'billing_details_name'
    },{
      pasteKey: 'data.setup_future_usage',
      value: undefined // cause it to be deleted
    },{
      pasteKey: 'data.mandate_data',
      value: {
        customer_acceptance: {
          accepted_at: 1647448692,
          type: "online",
          online: {
            ip_address: "71.183.194.54",
            user_agent: "Mozilla/5.0"
          }
        }
      }
    }]
  },{
    $api: () => collectBankAccountForSetup,
    pasteKey: 'data.payment_method',
    valueKey: 'result.setupIntent.payment_method',
    pastes:[{
      pasteKey: 'data.payment_method_types',
      value: ['us_bank_account']
    },{
      pasteKey: 'data.currency',
      value: 'usd'
    },{
      pasteKey: 'data.setup_future_usage',
      value: undefined // cause it to be deleted
    },{
      pasteKey: 'data.mandate_data',
      value: {
        customer_acceptance: {
          accepted_at: 1647448692,
          type: "online",
          online: {
            ip_address: "71.183.194.54",
            user_agent: "Mozilla/5.0"
          }
        }
      }
    }]
  }, {
    $api: () => setup_intent_create,
    pasteKey: 'data.payment_method',
    valueKey: 'result.payment_method',
    pastes: [{
      pasteKey: 'data.customer',
      valueKey: 'result.customer'
    },{
      pasteKey: 'data.setup_future_usage',
      // value: undefined // no value, we want this deleted
    }]
  }]
}
      /*payment_method_data: {
        us_bank_account: {financial_connections_account: 'fca_...'},
        // billing_details: {name: 'J. Customer'},
      },
      amount: 100,
      currency: 'usd',*/


const payintent_cancel: ISimpleRouteEditor = {
  title: '🚫 Cancel Pay Intent',
  link: 'https://stripe.com/docs/api/payment_intents/cancel',
  request: {
    method: 'POST',
    path: 'payment_intents/:id/cancel'
  },
  data: {
    cancellation_reason: 'requested_by_customer', // duplicate, fraudulent, requested_by_customer, or abandoned
  },
  pastes:[{
    $api: () => payintent_create,
    valueKey: 'result.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => payintent_retrieve,
    valueKey: 'result.id',
    pasteKey: 'request.params.id'
  },{
    $api: () => payintent_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id'
  }]
}

export const payintent_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ Retrieve Pay Intent by id',
  link: 'https://stripe.com/docs/api/payment_intents/retrieve',
  request: {
    method: 'GET',
    path: 'payment_intents/:id'
  },
  pastes: [{
    $api: () => payintent_create,
    title: '🆕 Created pay intent',
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  }, {
    $api: () => payintent_list,
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
    $api: () => payintent_confirm,
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  }, {
    $api: () => refund_create,
    valueKey: 'result.payment_intent',
    pasteKey: 'request.params.id'
  }]
}

export const payintent_confirm: ISimpleRouteEditor = {
  title: '👍 Confirm Pay Intent',
  description: 'If a pay intent requires verification',
  links: [{
    title: '3d-secure',
    url: 'https://stripe.com/docs/payments/3d-secure#confirm-payment-intent'
  }, {
    title: '📕 api docs',
    url: 'https://stripe.com/docs/api/payment_intents/confirm'
  }],
  request: {
    method: 'POST',
    path: 'payment_intents/:id/confirm'
  },
  data: {
    // 1-27-2022: For client side you don't need these details
    // client_secret: "",
    // return_url: window.location.href
  },
  pastes: [{
    $api: () => payintent_create,
    title: '🆕 Created pay intent',
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  }, {
    $api: () => payintent_list,
    pasteKey: 'request.params.id',
    valueKey: 'result.data.0.id'
  }, {
    title: 'xxx',
    $api: () => payintent_retrieve,
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
    valueMatches: [{
      expression: 'requires_confirmation',
      valueKey: 'result.status'
    }]
  }]
}

export const payintent_capture: ISimpleRouteEditor = {
  title: '📥 Capture Pay Intent',
  link: 'https://stripe.com/docs/api/payment_intents/capture',
  request: {
    method: 'POST',
    path: 'payment_intents/:id/capture'
  },
  pastes: [{
    $api: () => payintent_retrieve,
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  },{
    $api: () => payintent_create,
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  }, {
    $api: () => payintent_list,
    pasteKey: 'request.params.id',
    valueKey: 'result.data.0.id'
  }]
}

export const payintent_update: ISimpleRouteEditor = {
  title: '⬆️ Update Pay Intent by id',
  link: 'https://stripe.com/docs/api/payment_intents/update',
  request: {
    method: 'POST',
    path: 'payment_intents/:id'
  },
  data: {
    metadata: {order_id: '6735'}
  },
  pastes: [{
    $api: () => payintent_retrieve,
    title: '1️⃣ Pay intent retrieve by id',
    pasteKey: 'request.params.id',
    valueKey: 'result.id',
  },{
    $api: () => payintent_list,
    title: '🧾 Pay intent list 1️⃣',
    pasteKey: 'request.params.id',
    valueKey: 'result.data.0.id',
  },{
    $api: () => payintent_create,
    title: '🆕 Created pay intent',
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

export const payintent_search: ISimpleRouteEditor = {
  title: '🔎 search payment intents',
  link: 'https://stripe.com/docs/api/payment_intents/search',
  request: {
    method: 'GET',
    path: 'payment_intents/search',
  },
  pastes: [],
  data: {
    limit: 3, query: "metadata['key']:'value'"
  }
}

export const payintent_list: ISimpleRouteEditor = {
  title: '🧾 List all PaymentIntents',
  link: 'https://stripe.com/docs/api/payment_intents/retrieve',
  request: {
    method: 'GET',
    path: 'payment_intents'
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
  payintent_create,
  payintent_retrieve,
  payintent_search,
  payintent_list,
  payintent_update,
  payintent_confirm,
  payintent_capture,
  payintent_cancel,
]

export const payintents: ApiGroup = {
  icon: '🧧',
  title: 'Pay Intents', apis,
  description: 'A PaymentIntent guides you through the process of collecting a payment from your customer.',
  links: [{
    title: '📕 API docs',
    url: 'https://stripe.com/docs/api/payment_intents'
  },{
    title: '📦 💵 👤 💰 🛳 multiple charges & transfers',
    url: 'https://stripe.com/docs/connect/charges-transfers'
  }],
}