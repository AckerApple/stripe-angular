import { customer_create, customer_get, customer_list_all } from "./customers.api"
import { collectBankAccountToken, collectFinancialConnectionsAccounts, session_get } from "./financial-connections.api"
import { ISimpleRouteEditor } from "./typings"

export const setup_intent_create: ISimpleRouteEditor = {
  title: '🆕 Create setup intent',
  description: 'Creates a SetupIntent object.',
  hint: 'After the SetupIntent is created, attach a payment method and confirm to collect any required permissions to charge the payment method later.',
  links: [{
    url: 'https://stripe.com/docs/api/setup_intents/create',
    title: 'api docs'
  },{
    url: 'https://stripe.com/docs/api/mandates',
    title: 'mandate data'
  }],
  request:{
    method: 'POST',
    path: 'setup_intents'
  },
  data: {
    customer: "",
    confirm: true,
    usage: 'off_session',
    payment_method_types: [
      "acss_debit",
      "card",
      "card_present",
      "cashapp",
      // "bancontact",
      // "ideal",
      // "sepa_debit",
      "link",
      "sofort",
      "us_bank_account"
    ],
    mandate_data: {
      customer_acceptance: {
        accepted_at: 1647448692,
        type: "online",
        online: {
          ip_address: "71.183.194.54",
          user_agent: "Mozilla/5.0"
        }
      }
    },
    metadata: {},
  },
  pastes:[{
    $api: () => collectBankAccountToken,
    pasteKey: 'data.payment_method_data.us_bank_account.financial_connections_account',
    valueKey: 'result.financialConnectionsSession.accounts.0.id',
    pastes: [{
      pasteKey: 'data.payment_method_types',
      value: ['us_bank_account']
    },{
      pasteKey: 'data.payment_method_data.type',
      value: 'us_bank_account'
    },{
      pasteKey: 'data.payment_method_data.billing_details.name',
      value: 'billing_details_name'
    }]
  }, {
    $api: () => session_get,
    valueKey: 'result.client_secret',
    pasteKey: 'data.clientSecret'
  },{
    $api: () => customer_create,
    valueKey: 'result.id',
    pasteKey: 'data.customer'
  },{
    $api: () => customer_get,
    valueKey: 'result.id',
    pasteKey: 'data.customer'
  },{
    $api: () => customer_list_all,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.customer'
  },{
    $api: () => collectFinancialConnectionsAccounts,
    pasteKey: 'data.payment_method_data.us_bank_account.financial_connections_account',
    valueKey: 'result.financialConnectionsSession.accounts.0.id',
    pastes: [{
      pasteKey: 'data.payment_method_types',
      value: ['us_bank_account']
    },{
      pasteKey: 'data.payment_method_data.type',
      value: 'us_bank_account'
    },{
      pasteKey: 'data.payment_method_data.billing_details.name',
      value: 'billing_details_name'
    },{
      pasteKey: 'data.payment_method_data.metadata',
      value: {}
    }]
  }]
  // collectBankAccountToken
}

export const setup_intent_get: ISimpleRouteEditor = {
  title: '1️⃣ GET Setup Intent',
  description: 'Retrieves the token with the given ID',
  link: 'https://stripe.com/docs/api/setup_intents/retrieve',
  request:{
    method: 'GET',
    path: 'setup_intents/:setupIntentId'
  },
  pastes: [{
    $api: () => setup_intent_create,
    valueKey: 'result.id',
    pasteKey: 'request.params.setupIntentId'
  }]
}

export const setup_intent_update: ISimpleRouteEditor = {
  title: '⬆ Update setup intent',
  description: 'Updates a SetupIntent object.',
  link: 'https://stripe.com/docs/api/setup_intents/update',
  request:{
    method: 'POST',
    path: 'setup_intents/:setupIntentId'
  },
  data:{
    metadata: {},
    customer: '',
    description: '',
    payment_method: '',
    payment_method_types: [
      "acss_debit",
      "bancontact",
      "card",
      "card_present",
      "cashapp",
      "ideal",
      "link",
      "sepa_debit",
      "sofort",
      "us_bank_account"  
    ]
  },
  pastes: [{
    $api: () => setup_intent_create,
    valueKey: 'result.id',
    pasteKey: 'request.params.setupIntentId'
  },{
    $api: () => customer_create,
    valueKey: 'result.id',
    pasteKey: 'data.customer'
  },{
    $api: () => customer_get,
    valueKey: 'result.id',
    pasteKey: 'data.customer'
  }]
}

const apis = [
  setup_intent_create, setup_intent_get, setup_intent_update,
]

export const setupIntents = {
  title: 'Setup Intents', apis,
  description: 'The process of setting up and saving a customer\'s payment credentials for future payments',
  icon: '🧊',
  links: [{
    title: 'API Docs',
    url: 'https://stripe.com/docs/api/setup_intents'
  }]
}
