import { ISimpleRouteEditor } from "./app.component.utils"
import { bank } from "./banks.api"
import { card } from "./cards.api"
// import { cardApis, bank } from "./getApis.function"


export const accounts_create: ISimpleRouteEditor = {
  title: '🆕 Create account',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/accounts/create'
  },{
    title: 'testing',
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
  }
}

export const accounts_get: ISimpleRouteEditor = {
  title: '🧾 List all accounts',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/accounts/list'
  },{
    title: 'testing',
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
    title: 'testing',
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
  }]
}

export const accounts_update: ISimpleRouteEditor = {
  title: '⬆️ Update account',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/accounts/update'
  },{
    title: 'testing',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  // warn: '⚠️ Only live keys can access this method.',
  request:{
    method: 'POST',
    path: 'accounts/${id}'
  },
  data: {
    metadata: {
      order_id: '6735' // value in Stripe docs
    }
  },
  pastes:[{
    $api: () => accounts_get,
    // getTitle: () => accounts_get.result.data[0].id,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
  }]
}

export const accounts_retrieve: ISimpleRouteEditor = {
  title: '1️⃣ Account retrieve',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/accounts/retrieve'
  },{
    title: 'testing',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  // warn: '⚠️ Only live keys can access this method.',
  request:{
    method: 'GET',
    path: 'accounts/${id}'
  },
  pastes:[{
    $api: () => accounts_get,
    title: 'Accounts list 1️⃣',
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.id',
  }]
}

export const accounts_delete: ISimpleRouteEditor = {
  title: '❌ Account delete',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/accounts/delete'
  },{
    title: 'testing',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  request:{
    method: 'DELETE',
    path: 'accounts/${id}'
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
    title: 'testing',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  request:{
    method: 'POST',
    path: 'accounts/${account}/login_links'
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
  title: '♣️ ↔️ 🏦 Attach external account',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/external_account_bank_accounts/create'
  },{
    title: 'testing',
    url: 'https://stripe.com/docs/connect/testing'
  }],
  messages: [{
    valueKey: 'data.external_account',
    valueExpression: 'ba_',
    message: '⚠️ It appears you are using a bank account identifier. Expected bank token (btok_...)'
  },{
    valueKey: 'data.external_account',
    valueExpression: 'pm_',
    message: '⚠️ It appears you are using a payment method. Expected card token (tok_...)'
  }],
  request:{
    method: 'POST',
    path: 'accounts/${account}/external_accounts',
    params: {
      account: 'acct_',
    }
  },
  data: {
    external_account: 'btok_',
  },
  pastes:[{
    $api: () => accounts_retrieve,
    title: 'Accounts GET',
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
  title: '🧾 🏦 List all external accounts',
  request:{
    method: 'GET',
    path: 'accounts/${account}/external_accounts',
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
  title: 'GET external_account 1️⃣',
  request: {
    method: 'GET',
    path: 'accounts/:account/external_accounts/:external_account'
  },
  link: 'https://stripe.com/docs/api/external_account_bank_accounts/retrieve',
}

const application_fees_list: ISimpleRouteEditor = {
  title: '🧾 List all application fees',
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
  title: 'Retrieve an application fee',
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
  title: 'Retrieve an application fee refund',
  link: 'https://stripe.com/docs/api/fee_refunds/retrieve',
  request: {
    method: 'GET',
    path: 'application_fees/:id/refunds/:id'
  }
}

const application_fees_refunds_update: ISimpleRouteEditor = {
  title: '⬆️Update an application fee refund',
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
  title: 'List all application fee refunds',
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