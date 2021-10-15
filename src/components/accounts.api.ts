import { ISimpleRouteEditor } from "./typings"
import { bank } from "./banks.api"
import { card } from "./cards.api"
// import { cardApis, bank } from "./getApis.function"


export const accounts_create: ISimpleRouteEditor = {
  title: '🆕 Create account',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/accounts/create'
  },{
    title: '🔬 testing data',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  // warn: '⚠️ From a web page, only live keys can access this method. Goto "Server-side communications only" section, below.',
  request:{
    method: 'POST',
    path: 'accounts'
  },
  data: {
    country: 'US',
    type: 'custom',
    capabilities: {
      card_payments: {
        requested: true,
      },
      transfers: {
        requested: true,
      },
    },
    metadata: {
      order_id: '6735' // value in Stripe docs
    }
  },
  examples: [{
    title: 'individual',
    data: {
      business_type: "individual",
      country: 'US',
      type: 'custom',
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
      email: "jenny.rosen@example.com",
      individual: {
        email: "jenny.rosen@example.com",
        first_name: "jenny",
        last_name: 'rosen',
        phone: '000-000-0000',
        ssn_last_4: '0000',
        dob: {day:'01', month: '01', year: '1901'},
        address: {
          city: "coconut creek",
          country: "US",
          line1: "address_full_match​",
          postal_code: "33066",
          state: "FL"
        },
        metadata: {
          'stripe-angular': 'demo'
        }
      },
      metadata: {
        order_id: '6735' // value in Stripe docs
      }
    },
  }]
}

export const accounts_get: ISimpleRouteEditor = {
  title: '🧾 List all accounts',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/accounts/list'
  },{
    title: '🔬 testing data',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  request:{
    method: 'GET',
    path: 'accounts'
  },
  data: {
    limit: 3,
  },
  pastes: [{
    $api: () => accounts_get,
    valueKey: 'result.data.0.id',
    pasteKey: 'data.starting_after',
  }]
}

export const account_links_create: ISimpleRouteEditor = {
  title: '🆕 🔗 Create account link',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/account_links/create'
  },{
    title: '🔬 testing data',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  favKeys: [{valueKey: 'result.url', type:'link'}],
  request:{
    method: 'POST',
    path: 'account_links'
  },
  data: {
    account: '',
    refresh_url: window.location.href,
    return_url: window.location.href,
    type: 'account_onboarding'
     // metadata: sample.metadata // not available here
  },
  pastes:[{
    $api: () => accounts_get,
    title: 'Accounts GET 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'data.account',
  },{
    $api: () => accounts_create,
    title: '🆕 Accounts Create',
    valueKey: 'result.id',
    pasteKey: 'data.account',
  },{
    $api: () => accounts_retrieve,
    title: '1️⃣ Accounts retrieve',
    valueKey: 'result.id',
    pasteKey: 'data.account',
  }]
}

export const accounts_update: ISimpleRouteEditor = {
  title: '⬆️ Update account',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/accounts/update'
  },{
    title: '🔬 testing data',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  // warn: '⚠️ Only live keys can access this method.',
  request:{
    method: 'POST',
    path: 'accounts/:id'
  },
  data: {
    metadata: {
      order_id: '6735' // value in Stripe docs
    }
  },
  pastes:[{
    $api: () => accounts_get,
    title: '🧾 Accounts list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
  },{
    $api: () => accounts_retrieve,
    title: '1️⃣ Accounts retrieve',
    valueKey: 'result.id',
    pasteKey: 'request.params.id',
    pastes: [{
      pasteKey: 'data', valueKey:'result',
      removeKeys: [
        'id', 'object', 'created', 'charges_enabled',
        'country', 'details_submitted',
        'external_accounts', 'future_requirements',
        'payouts_enabled', 'requirements', 'type',

        'individual.id', 'individual.account', 'individual.object', 'individual.created',
        'individual.id_number_provided',
        'individual.relationship',
        'individual.requirements',
        'individual.ssn_last_4_provided',
        'individual.future_requirements',
        'individual.verification.status',

        'company.tax_id_provided',
        'capabilities.transfers',
        'capabilities.card_payments',
        'settings.dashboard'
      ],
      removeValues: [null]
    }]
  },{
    $api: () => accounts_create,
    title: '🆕 Accounts create',
    valueKey: 'result.id',
    pasteKey: 'request.params.id',
  }]
}

export const accounts_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ Account retrieve',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/accounts/retrieve'
  },{
    title: '🔬 testing data',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  // warn: '⚠️ Only live keys can access this method.',
  request:{
    method: 'GET',
    path: 'accounts/:id'
  },
  pastes:[{
    $api: () => accounts_get,
    title: 'Accounts list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
  },{
    $api: () => accounts_update,
    // title: '⬆️ Accounts Update 1️⃣',
    valueKey: 'result.id',
    pasteKey: 'request.params.id',
  },{
    $api: () => accounts_create,
    // title: '🆕 Account Create',
    valueKey: 'result.id',
    pasteKey: 'request.params.id',
  }]
}

export const accounts_delete: ISimpleRouteEditor = {
  title: '❌ Account delete',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/accounts/delete'
  },{
    title: '🔬 testing data',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  request:{
    method: 'DELETE',
    path: 'accounts/:id'
  },
  pastes:[{
    $api: () => accounts_get,
    title: 'Accounts GET 1️⃣ result',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
  }]
}

export const account_login_link: ISimpleRouteEditor = {
  title: '🔓 🔗 Create account login link',
  warn: '⚠️ for express accounts only',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/account/login_link'
  },{
    title: '🔬 testing data',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  request:{
    method: 'POST',
    path: 'accounts/:account/login_links'
  },
  data: {
    redirect_url: window.location.href,
  },
  pastes:[{
    $api: () => accounts_get,
    title: 'Accounts list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => accounts_retrieve,
    title: 'Accounts retrieve',
    valueKey: 'result.id',
    pasteKey: 'request.params.account',
  }]
}

export const external_accounts_create: ISimpleRouteEditor = {
  title: '♣️ ↔️ 🏦 💳 Attach external account',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/external_account_bank_accounts/create'
  },{
    title: '🔬 testing data',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  request:{
    method: 'POST',
    path: 'accounts/:account/external_accounts'
  },
  data: {
    external_account: 'btok_ or pm_',
    metadata: {
      order_id: '6784'
    }
  },
  messages: [{
    valueKey: 'data.external_account',
    valueExpression: 'ba_',
    message: '⚠️ It appears you are using a bank account identifier. Expected bank token (btok_...)'
  },{
    valueKey: 'data.external_account',
    valueExpression: 'pm_',
    message: '⚠️ It appears you are using a payment method. Expected card token (tok_...)'
  }],
  pastes:[{
    $api: () => accounts_retrieve,
    title: 'Accounts GET',
    valueKey: 'result.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => accounts_create,
    title: '🆕 Accounts Create',
    valueKey: 'result.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => accounts_get,
    title: 'Accounts GET 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => bank,
    title: 'bank token',
    valueKey: 'result.id',
    pasteKey: 'data.external_account',
  },{
    $api: () => card,
    title: 'card token',
    valueKey: 'result.token.id',
    pasteKey: 'data.external_account',
  },{
    $api: () => card,
    title: 'card pay method',
    valueKey: 'result.payment_method.id',
    pasteKey: 'data.external_account',
  }]
}

export const accounts_external_list: ISimpleRouteEditor = {
  title: '🧾 🏦 💳 List all external accounts',
  request:{
    method: 'GET',
    path: 'accounts/:account/external_accounts',
  },
  data: {
    limit: 3,
  },
  examples: [{
    title: 'bank_account search',
    data: {
      object: 'bank_account', limit: 3,
    }
  }],
  pastes:[{
    $api: () => accounts_get,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.account',
  }]
}

const external_accounts_retrieve: ISimpleRouteEditor = {
  title: '🏦 💳 GET external_account 1️⃣',
  request: {
    method: 'GET',
    path: 'accounts/:account/external_accounts/:external_account'
  },
  link: 'https://stripe.com/docs/api/external_account_bank_accounts/retrieve',
}

const application_fees_list: ISimpleRouteEditor = {
  title: '🧾 🤌 List all application fees',
  link: 'https://stripe.com/docs/api/application_fees/list',
  request: {
    path: 'application_fees',
    method: 'GET'
  },
  data: {
    limit: 3,
  }
}

const application_fees_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ 🤌 Retrieve an application fee',
  link: 'https://stripe.com/docs/api/application_fees/retrieve',
  request: {
    path: 'application_fees/:id',
    method: 'GET'
  },
}

const application_fees_refunds_create: ISimpleRouteEditor = {
  title: '🆕 Create an application fee refund',
  link: 'https://stripe.com/docs/api/fee_refunds/create',
  request: {
    method: 'POST',
    path: 'application_fees/:id/refunds'
  }
}

const application_fees_refunds_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ 🤌 ↩️ Retrieve an application fee refund',
  link: 'https://stripe.com/docs/api/fee_refunds/retrieve',
  request: {
    method: 'GET',
    path: 'application_fees/:id/refunds/:id'
  }
}

const application_fees_refunds_update: ISimpleRouteEditor = {
  title: '⬆️ 🤌 ↩️ Update an application fee refund',
  link: 'https://stripe.com/docs/api/fee_refunds/update',
  request: {
    method: 'POST',
    path: 'application_fees/:id/refunds/:id'
  },
  data: {
    metadata: {order_id: '6735'}
  }
}

const application_fees_refunds: ISimpleRouteEditor = {
  title: '🧾 🤌 ↩️ List all application fee refunds',
  link: 'https://stripe.com/docs/api/fee_refunds/list',
  request: {
    method: 'GET',
    path: 'application_fees/:id/refunds'
  }
}

export const apis = [
  accounts_get, accounts_create, accounts_update, accounts_retrieve, accounts_delete,
  account_links_create, account_login_link,
  external_accounts_create, accounts_external_list, external_accounts_retrieve,
  application_fees_list, application_fees_retrieve,
  application_fees_refunds_create, application_fees_refunds_retrieve, application_fees_refunds_update, application_fees_refunds
]