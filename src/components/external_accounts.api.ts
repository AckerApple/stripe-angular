import { accounts_create, accounts_list, accounts_retrieve, accounts_update } from './accounts.api'
import { plaid_stripeBankCreate } from "./plaid.apis"
import { ISimpleRouteEditor } from './typings'
import { card } from "./sources.api"
import { bank } from "./banks.api"

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
    valueKey: 'result.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => accounts_create,
    valueKey: 'result.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => accounts_update,
    valueKey: 'result.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => bank,
    valueKey: 'result.id',
    pasteKey: 'data.external_account',
  },{
    $api: () => card,
    valueKey: 'result.token.id',
    pasteKey: 'data.external_account',
  },{
    $api: () => card,
    valueKey: 'result.payment_method.id',
    pasteKey: 'data.external_account',
  }, {
    $api: () => plaid_stripeBankCreate,
    valueKey: 'result.stripe_bank_account_token',
    pasteKey: 'data.external_account'
  }]
}

export const external_accounts_update: ISimpleRouteEditor = {
  title: '⬆️ ♣️ ↔️ 🏦 Update external account',
  links: [{
    title: 'docs',
    url: 'https://stripe.com/docs/api/external_account_bank_accounts/update'
  }],
  request:{
    method: 'POST',
    path: 'accounts/:account/external_accounts/:external_account'
  },
  data: {
    default_for_currency: false,
    // account_holder_name: 'account_holder_name',
    // account_holder_type: 'individual',
    // account_type: 'savings',
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
    valueKey: 'result.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => accounts_create,
    valueKey: 'result.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => accounts_update,
    valueKey: 'result.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.account',
  },{
    $api: () => bank,
    valueKey: 'result.id',
    pasteKey: 'data.external_account',
  },{
    $api: () => card,
    valueKey: 'result.token.id',
    pasteKey: 'data.external_account',
  },{
    $api: () => card,
    valueKey: 'result.payment_method.id',
    pasteKey: 'data.external_account',
  }, {
    $api: () => plaid_stripeBankCreate,
    valueKey: 'result.stripe_bank_account_token',
    pasteKey: 'data.external_account'
  }, {
    $api: () => external_accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.external_account',
    pastes: [{
      valueKey: 'result.data.0.account',
      pasteKey: 'request.params.account'
    }]
  }]
}

export const external_accounts_list: ISimpleRouteEditor = {
  title: '🧾 🏦 💳 List all external accounts',
  links: [{
    title: '📕 API Docs',
    url: 'https://stripe.com/docs/api/external_account_bank_accounts/list'
  }],
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
    $api: () => accounts_list,
    valueKey: 'result.data.0.id',
    pasteKey: 'request.params.account',
  }, {
    $api: () => accounts_retrieve,
    valueKey: 'result.id',
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


export const externalAccounts = [
  external_accounts_create,
  external_accounts_list, external_accounts_retrieve,
  external_accounts_update,
]
